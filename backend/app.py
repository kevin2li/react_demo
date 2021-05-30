import base64
import io
import os
import sys
sys.path.append('..')
import time
from pprint import pformat

from flask import Flask, jsonify, request, send_file
from flask_restful import Api, Resource
from PIL import Image
from backend.pytorch_version.models import ZhuNet
import torch.nn.functional as F
import torchvision.transforms as T
from icecream import ic
# os.environ['FLASK_APP'] = '/home/kevin2li/code/react_demo/flask-demo'
# os.environ['FLASK_ENV']='development'
model = ZhuNet()
model = model.load_from_checkpoint('/home/kevin2li/code/react_demo/backend/pytorch_version/checkpoints/wow-epoch=210-val_loss=0.44-val_acc=0.85.ckpt')
eval_transforms = T.Compose([
    T.ToTensor()
])
app = Flask(__name__)
api = Api(app)

def img_preprocess(img_path, eval_transforms=eval_transforms):
    img = Image.open(img_path)
    img = eval_transforms(img)
    img = img.unsqueeze(0)
    return img

@app.route('/time')
def get_current_time():
    return {'time': time.time()}

@app.route('/')
def index():
    return "首页"

@app.route('/steganography')
def steganography():
    return "隐写术"

@app.route('/steganalysis')
def steganalysis():
    return "隐写分析"

@app.route('/download')
def download():
    return "下载专区"

@app.route('/about')
def about():
    return "关于我们"

@app.route('/submit', methods=['GET', 'POST'])
def submit():
    print(request.method)
    note = request.form.get('note')
    gender = request.form.get('gender')
    imgs = request.files['file']
    imgs.save(f"upload/{imgs.filename}")
    print(pformat(vars(request)))
    print(note, gender)
    return {'name': 'Lucy'}

@app.route('/image', methods=['GET'])
def get_image():
    img = Image.open('upload/12.png')
    buffer = io.BytesIO()
    img.save(buffer, format='PNG')
    image_binary = buffer.getvalue()
    encoded_img = base64.encodebytes(image_binary).decode('ascii')
    return jsonify({'type': 'image', 'image_data': encoded_img})

@app.route('/predict', methods=['POST'])
def predict():
    img = request.files['file']
    save_path = f"upload/{img.filename}"
    img.save(save_path)
    img = img_preprocess(save_path)
    logits = model(img)
    probs = F.softmax(logits, dim=1)
    ic(probs)
    return jsonify({'probs': probs.tolist()})