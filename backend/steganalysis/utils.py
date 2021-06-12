# %%
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from PIL import Image
import torch
import torchvision.transforms as T
plt.style.use('seaborn')

# %%
eval_transforms = T.Compose([
    T.ToTensor()
])
def img_preprocess(img_path, eval_transforms=eval_transforms):
    img = Image.open(img_path)
    img = eval_transforms(img)
    img = img.unsqueeze(0)
    return img

def plot_group_bars(result: dict):
    df = pd.DataFrame(result)
    labels = result.keys()
    x = np.arange(len(labels))  # the label locations
    width = 0.35  # the width of the bars

    fig, ax = plt.subplots()
    rects1 = ax.bar(x - width/2, df.iloc[0], width, label='cover')
    rects2 = ax.bar(x + width/2, df.iloc[1], width, label='stego')

    # Add some text for labels, title and custom x-axis tick labels, etc.
    ax.set_xlabel('model')
    ax.set_ylabel('probality')
    ax.set_title('predict results')
    ax.set_xticks(x)
    ax.set_xticklabels(labels)
    ax.legend()

    ax.bar_label(rects1, padding=3)
    ax.bar_label(rects2, padding=3)
    fig.tight_layout()
    return fig