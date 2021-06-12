# %%
import base64
import io
import os
import sys

sys.path.append('..')
import time
import traceback
from pathlib import Path
import shutil
import numpy as np
import torch.nn.functional as F
import yaml
from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
from icecream import ic
from PIL import Image
from uuid import uuid4
from backend.steganalysis.pytorch_version.models import SRNet, XuNet, YedNet, YeNet, ZhuNet
from backend.steganalysis.tensorflow_version.models import XuNet as XuNet_tf, YeNet as YeNet_tf
from backend.steganalysis.utils import img_preprocess, plot_group_bars
from backend.steganography import encodeLSB, decodeLSB

from backend import root_dir
# %%
upload_dir = Path('upload')
upload_dir.mkdir(parents=True, exist_ok=True)
cfg_path = str(root_dir / 'backend/steganalysis/res/map.yml')
with open(cfg_path) as f:
    cfg = yaml.safe_load(f)
# %%

app = Flask(__name__)
cors = CORS(app)

@app.route('/time')
def get_current_time():
    return {'time': time.time()}

@app.route('/')
@app.route('/index')
def index():
    return jsonify({'current_tab': '1'})

@app.route('/steganography')
def steganography():
    return jsonify({'current_tab': '2'})

@app.route('/steganalysis')
def steganalysis():
    return jsonify({'current_tab': '3'})

@app.route('/download')
def download():
    return jsonify({'current_tab': '4'})

@app.route('/blog')
def blog():
    return jsonify({'current_tab': '5'})

@app.route('/about')
@cross_origin()
def about():
    ic('about')
    return jsonify({'current_tab': '6'})


@app.route('/image', methods=['GET'])
def get_image():
    img = Image.open('upload/12.png')
    buffer = io.BytesIO()
    img.save(buffer, format='PNG')
    image_binary = buffer.getvalue()
    encoded_img = base64.encodebytes(image_binary).decode('ascii')
    return jsonify({'type': 'image', 'image_data': encoded_img})

@app.route('/predict', methods=['POST'])
@cross_origin()
def predict():
    # ic(vars(request))
    img_list = request.files.getlist('img_list')
    models = request.form['models'].split(',')
    datasets = request.form['dataset'].split(',')
    embedding_rates = request.form['embedding_rate'].split(',')
    ic(img_list)
    ic(models)
    ic(datasets)
    ic(embedding_rates)

    img_path_list = []
    save_dir = upload_dir / str(uuid4())
    save_dir.mkdir(parents=True, exist_ok=True)
    for img in img_list:
        save_path = str(save_dir / img.filename)
        img.save(save_path)
        img_path_list.append(save_path)
    ic(img_path_list)

    try:
        response = {'status': 'ok'}
        response['result'] = []
        key = 1
        if img_path_list and models and datasets and embedding_rates:
            for img_path in img_path_list:
                for dataset in datasets:
                    for embedding_rate in embedding_rates:
                        for model_name in models:
                            framework = 'pytorch' if model_name in ('ZhuNet', 'YedNet') else 'tensorflow'

                            # 实例化模型+加载权重
                            if framework == 'pytorch':
                                model = eval(model_name)()
                                ckpt_path = str(root_dir / cfg['framework'][framework]['dataset'][dataset]['embedding_rate'][embedding_rate]['model'][model_name]) if cfg['framework'][framework]['dataset'][dataset]['embedding_rate'][embedding_rate]['model'][model_name] else None
                                ic(ckpt_path)
                                if ckpt_path:
                                    model = model.load_from_checkpoint(ckpt_path)
                                # 推理
                                img = img_preprocess(img_path)
                                logits = model(img)
                                ic(logits)
                                probs = F.softmax(logits, dim=1).squeeze()
                                ic(probs)
                            elif framework == 'tensorflow':
                                model = eval(f"{model_name}_tf")()
                                ckpt_path = str(root_dir / cfg['framework'][framework]['dataset'][dataset]['embedding_rate'][embedding_rate]['model'][model_name]) if cfg['framework'][framework]['dataset'][dataset]['embedding_rate'][embedding_rate]['model'][model_name] else None
                                ic(ckpt_path)
                                if ckpt_path:
                                    model.load_weights(ckpt_path)
                                
                                img = np.array(Image.open(img_path))
                                probs = model(img).squeeze()
                                ic(probs)

                            # 记录
                            response['result'].append({
                                'key': key,
                                'image': img_path.split('/')[-1],
                                'framework': framework,
                                'dataset': dataset,
                                'embedding_rate': embedding_rate,
                                'model': model_name,
                                'cover': np.round(probs[0].item(), 3),
                                'stego': np.round(probs[1].item(), 3),
                                'result': 'cover' if probs[0] > probs[1] else 'stego'
                            })
                            key += 1
            ic(response['result'])

            # fig = plot_group_bars(response['result'])
            # fig.savefig('bar.png')

            # img = Image.open('bar.png')
            # buffer = io.BytesIO()
            # img.save(buffer, format='PNG')
            # image_binary = buffer.getvalue()
            # encoded_img = base64.encodebytes(image_binary).decode('ascii')
            # response['result']['image'] = encoded_img
            
            # post process
            shutil.rmtree(str(save_dir))

    except:
        traceback.print_exc()
        response['status'] = 'failed'
    return jsonify(response)

@app.route('/traditional_stega', methods=['POST'])
@cross_origin()
def traditional_stega():
    ic(request.form)
    img_list = request.files.getlist('img_list')
    model = request.form['model']
    type = request.form['type']
    msg = request.form['message']
    ic(img_list)
    ic(model)
    ic(type)
    ic(msg)

    img_path_list = []
    save_dir = upload_dir / str(uuid4())
    save_dir.mkdir(parents=True, exist_ok=True)
    for img in img_list:
        save_path = str(save_dir / img.filename)
        img.save(save_path)
        img_path_list.append(save_path)
    ic(img_path_list)

    
    response = {'status': 'ok'}
    try:
        if type == 'embed':
            for img_path in img_path_list:
                out_img = encodeLSB(msg, img_path)
                out_img.save('test.png', format='png')
                buffer = io.BytesIO()
                out_img.save(buffer, format='PNG')
                image_binary = buffer.getvalue()
                encoded_img = base64.encodebytes(image_binary).decode('ascii')
                break
            response['result'] = {'image_data': encoded_img}
        else:
            for img_path in img_path_list:
                message = decodeLSB(img_path)
                response['result'] = {'message': message}
    except:
        traceback.print_exc()
        response['status'] = 'failed'
    # ic(response)
    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True, port=9000)
