// ✏️ EDIT ME — your publication list.
//
// Per-entry fields:
//   year     — used for the year grouping headers
//   authors  — full author list, in order
//   selfIdx  — index of YOUR name in `authors` (rendered bold; long lists
//              truncate to the first 5 — or up to your name — behind "et al.")
//   corrIdx  — index of the corresponding author (gets the ✉ envelope),
//              or null
//   badge    — 'Spotlight' | 'Oral' | 'Best Paper' | 'Distinguished Paper'
//              | null
//   links    — chip links shown under the entry ('Paper' = official published
//              version, listed before the 'arXiv' preprint link)
//   github   — { repo } for the GitHub ★ chip (baked star count), or null
//   demo     — URL for a live-demo chip, or omitted
//   featured — true to always show the paper by default (never collapsed),
//              even when its venue is not in TOP_VENUES
//
// On the Publications page each year shows its top-venue (and featured) papers
// by default; the rest collapse behind a "+ Show N more" toggle (see TOP_VENUES).

export const PUBLICATIONS = [
  // ── 2026 ────────────────────────────────────────────────
  {
    year: 2026,
    title: 'AlphaOracle: Oracle Bone Script Decipherment via Human-Workflow-Inspired Deep Learning',
    authors: ['Yuliang Liu', 'Haisu Guan', 'Pengjie Wang', 'Xinyu Wang', 'Jinpeng Wan', 'Kaile Zhang', 'Handong Zheng', 'Xingchen Liu', 'Zhebin Kuang', 'Huanxin Yang', 'Bang Li', 'Yongge Liu', 'Lianwen Jin', 'Xiang Bai'],
    selfIdx: 3, corrIdx: null,
    venue: 'The Innovation', badge: null, featured: true,
    links: [{ l: 'Paper', h: 'https://www.cell.com/the-innovation/fulltext/S2666-6758(26)00209-2' }],
    github: { repo: 'Yuliang-Liu/AlphaOracle' },
    demo: 'http://vlrlabmonkey.xyz:7685/?lan=en',
  },
  {
    year: 2026,
    title: 'ProxyWar: Dynamic Assessment of LLM Code Generation in Game Arenas',
    authors: ['Wenjun Peng', 'Xinyu Wang', 'Qi Wu'],
    selfIdx: 1, corrIdx: 1,
    venue: 'ICSE 2026', badge: 'Distinguished Paper',
    links: [{ l: 'arXiv', h: 'https://arxiv.org/abs/2602.04296' }],
    github: { repo: 'xinke-wang/ProxyWar' },
  },
  {
    year: 2026,
    title: 'TriEx: A Game-based Tri-View Framework for Explaining Internal Reasoning in Multi-Agent LLMs',
    authors: ['Ziyi Wang', 'Chen Zhang', 'Wenjun Peng', 'Qi Wu', 'Xinyu Wang'],
    selfIdx: 4, corrIdx: 4,
    venue: 'ACL 2026', badge: null,
    links: [{ l: 'arXiv', h: 'https://arxiv.org/abs/2604.20043' }],
    github: { repo: 'Einsam1819/TriEx' },
  },

  // ── 2025 ────────────────────────────────────────────────
  {
    year: 2025,
    title: 'Are Large Vision Language Models Good Game Players?',
    authors: ['Xinyu Wang', 'Bohan Zhuang', 'Qi Wu'],
    selfIdx: 0, corrIdx: null,
    venue: 'ICLR 2025', badge: null,
    links: [{ l: 'Paper', h: 'https://openreview.net/forum?id=c4OGMNyzPT' }, { l: 'arXiv', h: 'https://arxiv.org/abs/2503.02358' }],
    github: { repo: 'xinke-wang/LVLM-Playground' },
  },
  {
    year: 2025,
    title: 'NavBench: Probing Multimodal Large Language Models for Embodied Navigation',
    authors: ['Yanyuan Qiao', 'Haodong Hong', 'Wenqi Lyu', 'Dong An', 'Siqi Zhang', 'Yutong Xie', 'Xinyu Wang', 'Qi Wu'],
    selfIdx: 6, corrIdx: null,
    venue: 'NeurIPS 2025', badge: null,
    links: [{ l: 'Paper', h: 'https://openreview.net/forum?id=nf8PKQKtl2' }, { l: 'arXiv', h: 'https://arxiv.org/abs/2506.01031' }],
    github: { repo: 'NavBench/Evaluation_Code' },
  },
  {
    year: 2025,
    title: 'OCRBench v2: An Improved Benchmark for Evaluating Large Multimodal Models on Visual Text Localization and Reasoning',
    authors: ['Ling Fu', 'Zhebin Kuang', 'Jiajun Song', 'Mingxin Huang', 'Biao Yang', 'Yuzhe Li', 'Linghao Zhu', 'Qidi Luo', 'Xinyu Wang', 'Hao Lu', 'Zhang Li', 'Guozhi Tang', 'Bin Shan', 'Chunhui Lin', 'Qi Liu', 'Binghong Wu', 'Hao Feng', 'Hao Liu', 'Can Huang', 'Jingqun Tang', 'Wei Chen', 'Lianwen Jin', 'Yuliang Liu', 'Xiang Bai'],
    selfIdx: 8, corrIdx: null,
    venue: 'NeurIPS 2025', badge: null,
    links: [{ l: 'Paper', h: 'https://proceedings.neurips.cc/paper_files/paper/2025/hash/8c2e6bb15be1894b8fb4e0f9bcad1739-Abstract-Datasets_and_Benchmarks_Track.html' }, { l: 'arXiv', h: 'https://arxiv.org/abs/2501.00321' }],
    github: { repo: 'Yuliang-Liu/MultimodalOCR' },
  },
  {
    year: 2025,
    title: 'MonkeyOCR: Document Parsing with a Structure-Recognition-Relation Triplet Paradigm',
    authors: ['Zhang Li', 'Yuliang Liu', 'Qiang Liu', 'Zhiyin Ma', 'Ziyang Zhang', 'Shuo Zhang', 'Biao Yang', 'Zidun Guo', 'Jiarui Zhang', 'Xinyu Wang', 'Xiang Bai'],
    selfIdx: 9, corrIdx: null,
    venue: 'SCIS', badge: null,
    links: [{ l: 'arXiv', h: 'https://arxiv.org/abs/2506.05218' }],
    github: { repo: 'Yuliang-Liu/MonkeyOCR' },
  },
  {
    year: 2025,
    title: 'Rethinking Agentic and End-to-End Large Multimodal Models for Vision Tasks',
    authors: ['Yixin Wang', 'Xinyu Wang'],
    selfIdx: 1, corrIdx: 1,
    venue: 'DICTA 2025', badge: null,
    links: [{ l: 'Paper', h: 'https://ieeexplore.ieee.org/abstract/document/11302424/' }], github: null,
  },
  {
    year: 2025,
    title: 'Can Large Language Models Play to Win? Game-Theoretic Benchmarks in Poker for Probabilistic Reasoning Evaluation',
    authors: ['Wenjun Peng', 'Jing Zhe Lim', 'Qinghao Liu', 'Xinyu Wang'],
    selfIdx: 3, corrIdx: 3,
    venue: 'PRICAI 2025', badge: null,
    links: [{ l: 'Paper', h: 'https://doi.org/10.1007/978-981-95-7072-0_22' }],
    github: null,
  },

  // ── 2024 ────────────────────────────────────────────────
  {
    year: 2024,
    title: 'ModaVerse: Efficiently Transforming Modalities with LLMs',
    authors: ['Xinyu Wang', 'Bohan Zhuang', 'Qi Wu'],
    selfIdx: 0, corrIdx: null,
    venue: 'CVPR 2024', badge: null,
    links: [{ l: 'Paper', h: 'https://openaccess.thecvf.com/content/CVPR2024/html/Wang_ModaVerse_Efficiently_Transforming_Modalities_with_LLMs_CVPR_2024_paper.html' }, { l: 'arXiv', h: 'https://arxiv.org/abs/2401.06395' }],
    github: { repo: 'xinke-wang/ModaVerse' },
  },
  {
    year: 2024,
    title: 'Deciphering Oracle Bone Language with Diffusion Models',
    authors: ['Haisu Guan', 'Huanxin Yang', 'Xinyu Wang', 'Shengwei Han', 'Yongge Liu', 'Lianwen Jin', 'Xiang Bai', 'Yuliang Liu'],
    selfIdx: 2, corrIdx: [2, 7],
    venue: 'ACL 2024', badge: 'Best Paper',
    links: [{ l: 'Paper', h: 'https://aclanthology.org/2024.acl-long.831/' }, { l: 'arXiv', h: 'https://arxiv.org/abs/2406.00684' }],
    github: { repo: 'guanhaisu/OBSD' },
  },
  {
    year: 2024,
    title: 'An Open Dataset for Oracle Bone Character Recognition and Decipherment',
    authors: ['Pengjie Wang', 'Kaile Zhang', 'Xinyu Wang', 'Shengwei Han', 'Yongge Liu', 'Jinpeng Wan', 'Haisu Guan', 'Zhebin Kuang', 'Lianwen Jin', 'Xiang Bai', 'Yuliang Liu'],
    selfIdx: 2, corrIdx: null,
    venue: 'Scientific Data', badge: null,
    links: [{ l: 'Paper', h: 'https://www.nature.com/articles/s41597-024-03807-x' }, { l: 'arXiv', h: 'https://arxiv.org/abs/2401.15365' }],
    github: { repo: 'Pengjie-W/HUST-OBC' },
  },
  {
    year: 2024,
    title: 'An Open Dataset for the Evolution of Oracle Bone Characters: EVOBC',
    authors: ['Haisu Guan', 'Jinpeng Wan', 'Yuliang Liu', 'Pengjie Wang', 'Kaile Zhang', 'Zhebin Kuang', 'Xinyu Wang', 'Xiang Bai', 'Lianwen Jin'],
    selfIdx: 6, corrIdx: null,
    venue: 'arXiv', badge: null,
    links: [{ l: 'arXiv', h: 'https://arxiv.org/abs/2401.12467' }],
    github: { repo: 'RomanticGodVAN/character-Evolution-Dataset' },
  },
  {
    year: 2024,
    title: 'Puzzle Pieces Picker: Deciphering Ancient Chinese Characters with Radical Reconstruction',
    authors: ['Pengjie Wang', 'Kaile Zhang', 'Xinyu Wang', 'Shengwei Han', 'Yongge Liu', 'Lianwen Jin', 'Xiang Bai', 'Yuliang Liu'],
    selfIdx: 2, corrIdx: 2,
    venue: 'ICDAR 2024', badge: null,
    links: [{ l: 'Paper', h: 'https://doi.org/10.1007/978-3-031-70533-5_11' }, { l: 'arXiv', h: 'https://arxiv.org/abs/2406.03019' }],
    github: { repo: 'Pengjie-W/Puzzle-Pieces-Picker' },
  },
  {
    year: 2024,
    title: 'Text in the Dark: Extremely Low-Light Text Image Enhancement',
    authors: ['Che-Tsung Lin', 'Chun Chet Ng', 'Zhi Qin Tan', 'Wan Jun Nah', 'Xinyu Wang', 'Jie Long Kew', 'Pohao Hsu', 'Shang Hong Lai', 'Chee Seng Chan', 'Christopher Zach'],
    selfIdx: 4, corrIdx: null,
    venue: 'SPIC', badge: null,
    links: [{ l: 'Paper', h: 'https://doi.org/10.1016/j.image.2024.117212' }, { l: 'arXiv', h: 'https://arxiv.org/abs/2404.14135' }],
    github: { repo: 'chunchet-ng/Text-in-the-Dark' },
  },
  {
    year: 2024,
    title: 'When IC Meets Text: Towards a Rich Annotated Integrated Circuit Text Dataset',
    authors: ['Chun Chet Ng', 'Che-Tsung Lin', 'Zhi Qin Tan', 'Xinyu Wang', 'Jie Long Kew', 'Chee Seng Chan', 'Christopher Zach'],
    selfIdx: 3, corrIdx: null,
    venue: 'Pattern Recognition', badge: null,
    links: [{ l: 'Paper', h: 'https://doi.org/10.1016/j.patcog.2023.110124' }],
    github: { repo: 'chunchet-ng/ICText-AGCL' },
  },

  // ── 2023 ────────────────────────────────────────────────
  {
    year: 2023,
    title: 'SPTS v2: Single-Point Scene Text Spotting',
    authors: ['Yuliang Liu', 'Jiaxin Zhang', 'Dezhi Peng', 'Mingxin Huang', 'Xinyu Wang', 'Jingqun Tang', 'Can Huang', 'Dahua Lin', 'Chunhua Shen', 'Xiang Bai', 'Lianwen Jin'],
    selfIdx: 4, corrIdx: null,
    venue: 'IEEE TPAMI', badge: null,
    links: [{ l: 'Paper', h: 'https://doi.org/10.1109/TPAMI.2023.3312285' }, { l: 'arXiv', h: 'https://arxiv.org/abs/2301.01635' }],
    github: { repo: 'bytedance/SPTSv2' },
  },
  {
    year: 2023,
    title: 'Improving Handwritten Mathematical Expression Recognition via Similar Symbol Distinguishing',
    authors: ['Zhe Li', 'Xinyu Wang', 'Yuliang Liu', 'Lianwen Jin', 'Yichao Huang', 'Kai Ding'],
    selfIdx: 1, corrIdx: null,
    venue: 'IEEE TMM', badge: null,
    links: [{ l: 'Paper', h: 'https://doi.org/10.1109/TMM.2023.3260648' }],
    github: null,
  },
  {
    year: 2023,
    title: 'SwitchGPT: Adapting Large Language Models for Non-Text Outputs',
    authors: ['Xinyu Wang', 'Bohan Zhuang', 'Qi Wu'],
    selfIdx: 0, corrIdx: null,
    venue: 'arXiv', badge: null,
    links: [{ l: 'arXiv', h: 'https://arxiv.org/abs/2309.07623' }],
    github: null,
  },

  // ── 2022 ────────────────────────────────────────────────
  {
    year: 2022,
    title: 'SPTS: Single-Point Text Spotting',
    authors: ['Dezhi Peng', 'Xinyu Wang', 'Yuliang Liu', 'Jiaxin Zhang', 'Mingxin Huang', 'Songxuan Lai', 'Shenggao Zhu', 'Jing Li', 'Dahua Lin', 'Chunhua Shen', 'Xiang Bai', 'Lianwen Jin'],
    selfIdx: 1, corrIdx: null,
    venue: 'ACM MM 2022', badge: null,
    links: [{ l: 'Paper', h: 'https://doi.org/10.1145/3503161.3547942' }, { l: 'arXiv', h: 'https://arxiv.org/abs/2112.07917' }],
    github: { repo: 'shannanyinxiang/SPTS' },
  },

  // ── 2021 ────────────────────────────────────────────────
  {
    year: 2021,
    title: 'Exploring the Capacity of an Orderless Box Discretization Network for Multi-orientation Scene Text Detection',
    authors: ['Yuliang Liu', 'Tong He', 'Hao Chen', 'Xinyu Wang', 'Canjie Luo', 'Shuaitao Zhang', 'Chunhua Shen', 'Lianwen Jin'],
    selfIdx: 3, corrIdx: null,
    venue: 'IJCV', badge: null,
    links: [{ l: 'Paper', h: 'https://doi.org/10.1007/s11263-021-01459-7' }, { l: 'arXiv', h: 'https://arxiv.org/abs/1912.09629' }],
    github: { repo: 'Yuliang-Liu/Box_Discretization_Network' },
  },
  {
    year: 2021,
    title: 'ICDAR 2021 Competition on Integrated Circuit Text Spotting and Aesthetic Assessment',
    authors: ['Chun Chet Ng', 'Akmalul Khairi Bin Nazaruddin', 'Yeong Khang Lee', 'Xinyu Wang', 'Yuliang Liu', 'Chee Seng Chan', 'Lianwen Jin', 'Yipeng Sun', 'Lixin Fan'],
    selfIdx: 3, corrIdx: null,
    venue: 'ICDAR 2021', badge: null,
    links: [{ l: 'Paper', h: 'https://doi.org/10.1007/978-3-030-86337-1_44' }, { l: 'arXiv', h: 'https://arxiv.org/abs/2107.05279' }],
    github: null,
  },

  // ── 2020 ────────────────────────────────────────────────
  {
    year: 2020,
    title: 'On the General Value of Evidence, and Bilingual Scene-Text Visual Question Answering',
    authors: ['Xinyu Wang', 'Yuliang Liu', 'Chunhua Shen', 'Chun Chet Ng', 'Canjie Luo', 'Lianwen Jin', 'Chee Seng Chan', 'Anton van den Hengel', 'Liangwei Wang'],
    selfIdx: 0, corrIdx: null,
    venue: 'CVPR 2020', badge: null,
    links: [{ l: 'Paper', h: 'https://openaccess.thecvf.com/content_CVPR_2020/html/Wang_On_the_General_Value_of_Evidence_and_Bilingual_Scene-Text_Visual_CVPR_2020_paper.html' }, { l: 'arXiv', h: 'https://arxiv.org/abs/2002.10215' }],
    github: { repo: 'xinke-wang/EST-VQA' },
  },

  // ── 2019 ────────────────────────────────────────────────
  {
    year: 2019,
    title: 'Real-time Deep Tracking via Corrective Domain Adaptation',
    authors: ['Hanxi Li', 'Xinyu Wang', 'Fumin Shen', 'Yi Li', 'Fatih Porikli', 'Mingwen Wang'],
    selfIdx: 1, corrIdx: null,
    venue: 'IEEE TCSVT', badge: null,
    links: [{ l: 'Paper', h: 'https://doi.org/10.1109/TCSVT.2019.2923639' }],
    github: null,
  },
  {
    year: 2019,
    title: 'Human Detection Aided by Deeply Learned Semantic Masks',
    authors: ['Xinyu Wang', 'Chunhua Shen', 'Hanxi Li', 'Shugong Xu'],
    selfIdx: 0, corrIdx: null,
    venue: 'IEEE TCSVT', badge: null,
    links: [{ l: 'Paper', h: 'https://doi.org/10.1109/TCSVT.2019.2924912' }],
    github: null,
  },

  // ── 2017 ────────────────────────────────────────────────
  {
    year: 2017,
    title: 'Robust and Real-time Deep Tracking via Multi-Scale Domain Adaptation',
    authors: ['Xinyu Wang', 'Hanxi Li', 'Yi Li', 'Fumin Shen', 'Fatih Porikli'],
    selfIdx: 0, corrIdx: null,
    venue: 'ICME 2017', badge: null,
    links: [{ l: 'Paper', h: 'https://doi.org/10.1109/ICME.2017.8019450' }, { l: 'arXiv', h: 'https://arxiv.org/abs/1701.00561' }],
    github: null,
  },
  {
    year: 2017,
    title: 'Deep Tracking with Objectness',
    authors: ['Xinyu Wang', 'Hanxi Li', 'Yi Li', 'Fatih Porikli', 'Mingwen Wang'],
    selfIdx: 0, corrIdx: null,
    venue: 'ICIP 2017', badge: null,
    links: [{ l: 'Paper', h: 'https://doi.org/10.1109/ICIP.2017.8296363' }],
    github: null,
  },
];

// Venues whose names contain any of these render in accent blue AND are shown
// by default in each year's list; everything else (workshops, preprints, other
// journals, …) stays muted grey and collapses behind the per-year "show more".
export const TOP_VENUES = [
  'NeurIPS', 'ICML', 'ICLR', 'ACL', 'EMNLP', 'NAACL', 'CVPR', 'ICCV', 'ECCV',
  'SIGIR', 'KDD', 'WWW', 'AAAI', 'IJCAI', 'STOC', 'FOCS', 'SOSP', 'OSDI',
  'PLDI', 'POPL', 'ICSE', 'FSE', 'VLDB', 'SIGMOD', 'USENIX',
  'TPAMI', 'IJCV', 'ACM MM',
];
