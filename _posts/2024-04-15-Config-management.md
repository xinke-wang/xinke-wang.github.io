---
title: 机器学习项目中的配置文件管理
date: 2024-04-15
categories:
  - Blog
tags:
  - Coding Efficiency
comments: true
toc: true
toc_sticky: true
---

相信接触过机器学习项目，尤其是从零开始搭建一个代码库的同学们，通常会遇到一个问题：如何管理配置文件。在炼丹过程中，我们会对许多参数进行调整，例如学习率、模型结构、优化器参数等等。这些参数的调整不仅会影响到模型的性能，也会影响到代码的可读性和可维护性。如果直接将这些参数硬编码在代码中，那么每次调整参数都需要修改代码并重新运行，这无疑会增加我们的工作量。并且，随着修改参数的次数增多，我们可能会忘记之前的参数设置，从而导致无法复现之前的实验结果。因此，通常我们会将这些参数保存在配置文件中。将配置文件与代码分离，不仅可以提高代码的可读性和可维护性，还可以方便地管理参数，复现实验结果。

## 常见的配置文件格式

在 Python 项目中，我们通常会使用 `JSON`、`YAML`、`INI` 等格式的配置文件。

例如，著名的目标检测库 [MaskRCNN-Benchmark](https://github.com/facebookresearch/maskrcnn-benchmark) 以及 [YOLO](https://github.com/ultralytics/ultralytics/tree/main) 都使用了 `YAML` 格式的配置文件。`YAML` 是一种人类可读的数据序列化格式，它的语法简洁明了，适合用来编写配置文件。例如，下面是一个 MaskRCNN-Benchmark 中的配置文件 [faster-rcnn-R50-C4.yaml](https://github.com/facebookresearch/maskrcnn-benchmark/blob/main/configs/e2e_faster_rcnn_R_50_C4_1x.yaml) 示例：

```yaml
MODEL:
  META_ARCHITECTURE: "GeneralizedRCNN"
  WEIGHT: "catalog://ImageNetPretrained/MSRA/R-50"
  RPN:
    PRE_NMS_TOP_N_TEST: 6000
    POST_NMS_TOP_N_TEST: 1000
DATASETS:
  TRAIN: ("coco_2014_train", "coco_2014_valminusminival")
  TEST: ("coco_2014_minival",)
SOLVER:
  BASE_LR: 0.01
  WEIGHT_DECAY: 0.0001
  STEPS: (120000, 160000)
  MAX_ITER: 180000
  IMS_PER_BATCH: 8
```

读取这类配置文件的代码通常会使用 `PyYAML` 库，例如：

```python
import yaml

cfg_file = 'faster-rcnn-R50-C4.yaml'
with open(cfg_file, 'r') as f:
    cfg = yaml.load(f, Loader=yaml.FullLoader)
```

通过以上代码读取 `YAML` 格式的配置文件，我们可以得到一个字典 `cfg`，其中包含了配置文件中的所有参数。

```python
print(cfg)

# 输出：
# {'MODEL': {'META_ARCHITECTURE': 'GeneralizedRCNN', 'WEIGHT': 'catalog://ImageNetPretrained/MSRA/R-50', 'RPN': {'PRE_NMS_TOP_N_TEST': 6000, 'POST_NMS_TOP_N_TEST': 1000}}, 'DATASETS': {'TRAIN': '("coco_2014_train", "coco_2014_valminusminival")', 'TEST': '("coco_2014_minival",)'}, 'SOLVER': {'BASE_LR': 0.01, 'WEIGHT_DECAY': 0.0001, 'STEPS': '(120000, 160000)', 'MAX_ITER': 180000, 'IMS_PER_BATCH': 8}}
```

但是，使用这样的字典结构来管理配置文件，存在一些问题。例如 `YAML` 通常习惯采用大写字母来表示键，这样以来在 python 代码中会出现许多诸如 `cfg['MODEL']['META_ARCHITECTURE']` 这样的代码，不仅不够直观，而且容易出错。因此，我们通常会在代码中将配置文件中参数转换为类似 `cfg.MODEL.META_ARCHITECTURE` 的形式，以提高代码的可读性。由于 `yaml` 包并不支持这种形式的读取，因此我们通常会使用 [yacs](https://github.com/rbgirshick/yacs) 等额外的包来实现这一功能。

但是，当我们涉及到更复杂的配置文件操作时，例如基础配置文件、模型配置文件、数据集配置文件互相引用或合并时，以及配置文件中定义变量、函数等时，这种简单的配置文件格式就显得力不从心了。因此，我们需要更强大的配置文件管理工具。

## 使用 PJTOOLS 一站式管理配置文件

笔者在使用 [OpenMMLab](https://github.com/open-mmlab) 系列的开源代码库，例如 [MMDetection](https://github.com/open-mmlab/mmdetection) 时，第一次接触到直接使用 `python` 文件作为配置文件的方式。

例如，一个简单的 [detr-r101](https://github.com/open-mmlab/mmdetection/blob/main/configs/detr/detr_r101_8xb2-500e_coco.py) 的配置文件可以定义如下：

```python
_base_ = './detr_r50_8xb2-500e_coco.py'

model = dict(
    backbone=dict(
        depth=101,
        init_cfg=dict(type='Pretrained',
                      checkpoint='torchvision://resnet101')))
```

这带来了几个好处，例如：1. 直接使用 python 语法，对 python 项目更加友好； 2. 可以直接引用其它配置文件，方便复用； 3. 可以直接使用 python 语法定义变量、函数等，使得我们可以在配置文件中实现更复杂的逻辑。

但是，OpenMMLab 系列代码库的配置文件功能是集成在 [MMEngine](https://github.com/open-mmlab/mmengine) 中的。如果专门为了配置文件管理引入 MMEngine，可能会略显臃肿。

为此，我实现了一个简洁轻量的包 [project-tools](https://github.com/xinke-wang/project-tools)，简称 `pjtools`。目的是为了提供一些机器学习项目中可能会使用到的工具，例如配置文件管理、日志管理等。其中，配置文件管理是 `pjtools` 中的一个重要功能。

安装起来非常简单：

```bash
pip install pjtools
```

在 `pjtools` 中，我实现了 `AutoConfigurator` 类，其支持常用的 `YAML`, `JSON`, 和 `Python` 格式的配置文件，并采用了统一的接口进行封装。例如，我们可以使用 `AutoConfigurator` 来读取不同格式的配置文件：

```python
from pjtools.configurator.configurator import AutoConfigurator

config_file = 'config.yaml'
# config_file = 'config.json'
# config_file = 'config.py'

auto_config = AutoConfigurator.fromfile(config_file)
```

并且，对于 `python` 格式的配置文件，我们可以通过在配置文件中指定 `_base_` 来引用其它配置文件：

```python
# default.py
learning_rate = 0.01
momentum = 0.9
optimizer = 'Adam'
use_cuda = True
```

```python
# model.py
_base_ = ['tests/data/default.py']
learning_rate = 0.001
```

通过引用 `_base_`，我们可以将 `model.py` 中的配置文件与 `default.py` 中的配置文件合并，从而实现配置文件的复用。如果存在相同的键，后者会覆盖前者。

通过这种形式，我们甚至可以实现更加复杂的配置文件操作，例如定义类、变量、函数等。例如，以下配置文件来自我近期一篇论文 [ModaVerse: Efficiently Transforming Modalities with LLMs](https://github.com/xinke-wang/ModaVerse) 中的 [`base.py`](https://github.com/xinke-wang/ModaVerse/blob/main/configs/base.py) 配置文件：

```python
from typing import List

import torch
from peft import LoraConfig, TaskType
from transformers import StoppingCriteria, StoppingCriteriaList


class StoppingCriteriaSub(StoppingCriteria):

    def __init__(self, stops: List = None, encounters: int = 1):
        super().__init__()
        self.stops = stops
        self.ENCOUNTERS = encounters

    def __call__(self, input_ids: torch.LongTensor, scores: torch.FloatTensor):
        stop_count = 0
        for stop in self.stops:
            _stop = torch.tensor(stop).to(input_ids[0].device)
            indices = torch.where(_stop[0] == input_ids)
            for i in indices:
                if len(i) > 0:
                    if torch.all(input_ids[0][i:i + len(_stop)] == _stop):
                        stop_count += 1
        if stop_count >= self.ENCOUNTERS:
            return True
        return False


prompt_configs = dict(path='assets/prompts/prompt_template.txt',
                      media_placeholder='{media}',
                      instruction_placeholder='{instruction}')

model_configs = dict(
    name='ModaVerse-7b',
    imagebind=dict(hidden_size=1024),
    foundation_llm=dict(type='vicuna-7b', checkpoint='.checkpoints/7b_v0'),
    modaverse=dict(
        max_length=512,
        modality_begin_token='<Media>',
        modality_end_token='</Media>',
        modality_flags=['[TEXT]', '[IMAGE]', '[AUDIO]', '[VIDEO]'],
        target_padding=-100,
        top_p=0.01,
        temperature=1,
        max_new_tokens=246,
        do_sample=True,
        use_cache=True,
        stopping_token=835,
        stopping_criteria=StoppingCriteriaList(
            [StoppingCriteriaSub(stops=[[835]], encounters=1)], ),
        generator=dict(
            image_diffuser=dict(
                type='stable_diffusion',
                # preload=False,
                cfgs=dict(model='runwayml/stable-diffusion-v1-5')),
            video_diffuser=dict(
                type='damo_vilab',
                # preload=False,
                cfgs=dict(model='damo-vilab/text-to-video-ms-1.7b')),
            audio_diffuser=dict(type='audio_ldm',
                                cfgs=dict(model='cvssp/audioldm-l-full')),
        ),
    ))

training_configs = dict(
    lora_config=LoraConfig(
        task_type=TaskType.CAUSAL_LM,
        inference_mode=False,
        r=32,
        lora_alpha=32,
        lora_dropout=0.1,
        target_modules=['q_proj', 'k_proj', 'v_proj', 'o_proj']),
    deepspeed_cfg=dict(path='configs/dscfg.json', backend='nccl'),
    saving_root='./experiments',
    epochs=1,
    warmup_rate=0.1,
    force_training_layers=['embed_tokens.weight', 'lm_head.weight'],
    report_backend=dict(type='wandb', iterval=10),
    print_prediction=dict(turn_on=True, interval=1000),
    checkpointer=dict(type='iteration', interval=5000))

dataset_configs = dict(train=dict(instruction_path='dataset/instructions.json',
                                  media_root='dataset/'))
```

可以看到，通过使用 `python` 格式的配置文件，我们可以定义类、变量、函数等，实现更加复杂的配置文件操作。而 `pjtools` 的 `AutoConfigurator` 类可以帮助我们统一管理这些配置文件，提高代码的可读性和可维护性。