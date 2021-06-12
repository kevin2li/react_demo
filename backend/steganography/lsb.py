# %%
# modifyed from: https://github.com/VasilisG/LSB-steganography/blob/master/LSB_steganography/LsbSteg.py
from typing import Optional, Union

import matplotlib.pyplot as plt
import numpy as np
import torch
import torchvision
from PIL import Image

__all__ = ['encode', 'decode', 'generate_random_bitstream', 'encodeLSB', 'decodeLSB']

# %%
bitsPerChar = 8
bitsPerPixel = 1
maxBitStuffing = 2
# ========================================utils func========================================
def canEncode(message, image):
       width, height = image.size
       imageCapacity = width * height * bitsPerPixel
       messageCapacity = (len(message) * bitsPerChar) - (bitsPerChar + maxBitStuffing)
       return imageCapacity >= messageCapacity

def createBinaryTriplePairs(message):
       binaries = list("".join([bin(ord(i))[2:].rjust(bitsPerChar,'0') for i in message]) + "".join(['0'] * bitsPerChar))
       binaries = binaries + ['0'] * (len(binaries) % bitsPerPixel)
       binaries = [binaries[i*bitsPerPixel:i*bitsPerPixel+bitsPerPixel] for i in range(0,int(len(binaries) / bitsPerPixel))]
       return binaries

def embedBitsToPixels(binaryTriplePairs, pixels):
       binaryPixels = [list(bin(p)[2:].rjust(bitsPerChar,'0') for p in pixel) for pixel in pixels]
       for i in range(len(binaryTriplePairs)):
              for j in range(len(binaryTriplePairs[i])):
                     binaryPixels[i][j] = list(binaryPixels[i][j])
                     binaryPixels[i][j][-1] = binaryTriplePairs[i][j]
                     binaryPixels[i][j] = "".join(binaryPixels[i][j])

       newPixels = [tuple(int(p,2) for p in pixel) for pixel in binaryPixels]
       return newPixels

def getLSBsFromPixels(binaryPixels):
       totalZeros = 0
       binList = []
       for binaryPixel in binaryPixels:
              for p in binaryPixel:
                     if p[-1] == '0':
                            totalZeros = totalZeros + 1
                     else:
                            totalZeros = 0
                     binList.append(p[-1])
                     if totalZeros == bitsPerChar:
                            return  binList

# ========================================main func========================================

def generate_random_bitstream(length: int = 100) -> str:
    random_bits = ''.join(map(str, list(np.random.randint(0, 2, (length, )))))
    return random_bits

def encode(bitstreams: str, img: Union[Image.Image, np.ndarray, torch.Tensor]) -> Union[Image.Image, np.ndarray, torch.Tensor]:
    def embed(img:Image.Image, bitstreams:str) -> Image.Image:
        size = img.size
        if not canEncode(bitstreams, img):
                return None
        binaryTriplePairs = createBinaryTriplePairs(bitstreams)
        pixels = list(img.getdata())
        newPixels = embedBitsToPixels(binaryTriplePairs, pixels)
        newImg = Image.new("RGB", size)
        newImg.putdata(newPixels)
        return newImg

    if isinstance(img, Image.Image):
        encoded_img = embed(img, bitstreams)
    
    elif isinstance(img, torch.Tensor): 
        img = torchvision.transforms.functional.to_pil_image(img)
        encoded_img = embed(img, bitstreams)
        encoded_img = torch.tensor(np.array(encoded_img))

    elif isinstance(img, np.ndarray):
        img = Image.fromarray(img.astype(np.uint8))
        encoded_img = embed(img, bitstreams)
        encoded_img = np.array(encoded_img)
    else:
        raise ValueError("expect img be in (PIL.Image.Image, np.ndarry, torch.Tensor) format")

    return encoded_img

def decode(img: Union[Image.Image, np.ndarray, torch.Tensor]) -> str:
    if isinstance(img, Image.Image):
        pass
    elif isinstance(img, np.ndarray):
        img = Image.fromarray(img.astype(np.uint8))
    elif isinstance(img, torch.Tensor): 
        # img = torchvision.transforms.functional.to_pil_image(img)
        img = Image.fromarray(img.numpy().astype(np.uint8))
    else:
        raise ValueError("expect img be in (PIL.Image.Image, np.ndarry, torch.Tensor) format")

    pixels = list(img.getdata())
    binaryPixels = [list(bin(p)[2:].rjust(bitsPerChar,'0') for p in pixel) for pixel in pixels]
    binList = getLSBsFromPixels(binaryPixels)
    bitstreams = "".join([chr(int("".join(binList[i:i+bitsPerChar]),2)) for i in range(0,len(binList)-bitsPerChar,bitsPerChar)])

    return bitstreams

def encodeLSB(message, imageFilename):
       img = Image.open(imageFilename)
       size = img.size

       if not canEncode(message, img):
              return None

       binaryTriplePairs = createBinaryTriplePairs(message)

       pixels = list(img.getdata())
       newPixels = embedBitsToPixels(binaryTriplePairs, pixels)

       newImg = Image.new("RGB", size)
       newImg.putdata(newPixels)

       return newImg

def decodeLSB(imageFilename):
       img = Image.open(imageFilename)
       pixels = list(img.getdata())
       binaryPixels = [list(bin(p)[2:].rjust(bitsPerChar,'0') for p in pixel) for pixel in pixels]
       binList = getLSBsFromPixels(binaryPixels)
       message = "".join([chr(int("".join(binList[i:i+bitsPerChar]),2)) for i in range(0,len(binList)-bitsPerChar,bitsPerChar)])
       return message
# %%
# # ========================================test numpy input========================================
# noise_img = np.random.randn(64, 64, 3)
# plt.imshow(noise_img)
# # %%
# random_bits = generate_random_bitstream()
# # %%
# out = encode(random_bits, noise_img)
# plt.imshow(out)
# # %%
# decode(out)
# # %%
# # ========================================test tensor input========================================
# img = torch.randn(3, 256, 256)
# random_bits = generate_random_bitstream()
# out = encode(random_bits, img)
# out.shape
# # %%
# plt.imshow(out)
# # %%
# decode(out)
# # %%
