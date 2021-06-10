# %%
import base64
import io
import os
import sys
from collections import deque

sys.path.append('..')
import time
import traceback
from pathlib import Path

import numpy as np
import torch.nn.functional as F
import yaml
from flask import Flask, jsonify, request
from icecream import ic
from PIL import Image

from backend.pytorch_version.models import SRNet, XuNet, YedNet, YeNet, ZhuNet
from backend.tensorflow_version.models import XuNet as XuNet_tf, YeNet as YeNet_tf
from backend.utils import img_preprocess, plot_group_bars
from backend import root_dir
# %%
upload_dir = Path('upload')
upload_dir.mkdir(parents=True, exist_ok=True)
cfg_path = str(root_dir / 'backend/res/map.yml')
with open(cfg_path) as f:
    cfg = yaml.safe_load(f)
# %%

app = Flask(__name__)

state = {
    'img_path': deque(),
    'models': [],
    'embedding_rate': 0.4,
    'dataset': 'WOW',
    'framework': 'pytorch'
}

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
def about():
    return jsonify({'current_tab': '6'})


@app.route('/image', methods=['GET'])
def get_image():
    img = Image.open('upload/12.png')
    buffer = io.BytesIO()
    img.save(buffer, format='PNG')
    image_binary = buffer.getvalue()
    encoded_img = base64.encodebytes(image_binary).decode('ascii')
    return jsonify({'type': 'image', 'image_data': encoded_img})

@app.route('/upload_image', methods=['POST'])
def upload_image():
    img = request.files['file']
    save_path = str(upload_dir / img.filename)
    img.save(save_path)
    state['img_path'].append(save_path)
    ic(state['img_path'])
    return jsonify({'status': 'ok'})

@app.route('/predict', methods=['POST'])
def predict():
    ic(vars(request))
    models = request.form.get('models').split(',')
    datasets = request.form.get('dataset').split(',')
    embedding_rates = request.form.get('embedding_rate').split(',')
    framework = request.form.get('framework')
    ic(models)
    ic(framework)
    ic(datasets)
    ic(embedding_rates)
    try:
        response = {'status': 'ok'}
        response['result'] = []
        key = 1
        if state['img_path'] and models and framework and datasets and embedding_rates:
            for img_path in state['img_path']:
                for dataset in datasets:
                    for embedding_rate in embedding_rates:
                        for model_name in models:
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
            for img_path in state['img_path']:
                if os.path.exists(img_path):
                    os.remove(img_path)
            state['img_path'].clear()

    except:
        traceback.print_exc()
        response['status'] = 'failed'
    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True, port=9000)

# %%
import tensorflow as tf
tf.__version__
# %%
