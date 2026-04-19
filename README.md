
# **Assignment 2: OCR with Non-linear Models**  

- **Course Name:** Machine Learning for Public Policy (SPL 8810) 
- **Submission Date:** 23 April, 2026
- **Submitted By:** Himanshu Pandey  
- **Entry No:** 2025SMZ8477    
- **Submitted To:** Prof. Sugat Chaturvedi  


---

# Problem Statement and Objective

This assignment is about **handwritten digit recognition** using the **MNIST dataset**. The objective is to compare multiple machine learning approaches for optical character recognition (OCR), starting from a simple linear baseline and gradually moving toward more expressive non-linear and unsupervised methods.

The assignment evaluates the following approaches:

1. **Logistic Regression with Linear Features**
2. **Logistic Regression with Quadratic Polynomial Features**
3. **Neural Networks (Multi-Layer Perceptron)**
4. **Threshold-based Decision Control for Logistic Regression**
5. **Unsupervised Clustering with Cluster-level Label Assignment**

The workflow follows a standard machine learning pipeline:
- prepare data,
- split training data into train/validation,
- tune hyperparameters on validation data,
- retrain the best model on full training data,
- evaluate final performance on the separate test set.

This approach ensures that the final reported results are unbiased and reflect true model generalization.

---

# Dataset Description

The assignment uses the **MNIST handwritten digits dataset** in CSV format.

## Files
- `mnist_train.csv`: training dataset containing **60,000 observations**
- `mnist_test.csv`:  test dataset containing **10,000 observations**

## Data Format
Each row represents one handwritten digit image:
- **1 label column**: `label`
- **784 feature columns**: pixel intensities from a **28 × 28 grayscale image**

Therefore:
- Training data shape = **(60000, 785)**
- Test data shape = **(10000, 785)**

The label belongs to one of **10 classes**, representing digits **0 to 9**.

---

# Assignment Structure

A recommended folder structure is shown below:

```text
Assignment-2_Machine-Learning-for-Public-Policy/
│
├── README.md
│
├── code/
│   └── himanshu_pandey_A2.ipynb      # Notebook (code + outputs)
│
├── data/
│   └── mnist/
│       ├── mnist_train.csv           # Training dataset
│       └── mnist_test.csv            # Test dataset
│
└── report/
    └── himanshu_pandey_A2.pdf        # Final answers (Q a–e)
```

---

# Dependencies

This assignment is implemented in **Python** and uses common data science libraries.

## Required Packages
- `time`
- `gc`
- `numpy`
- `pandas`
- `scikit-learn`
- 
## Install Dependencies

### Option A: Direct installation with pip
```bash
pip install numpy pandas scikit-learn
```

### Option B: Create a virtual environment first
```bash
python -m venv venv
```

#### Windows
```bash
venv\Scripts\activate
```

#### macOS / Linux
```bash
source venv/bin/activate
```

Then install:
```bash
pip install numpy pandas scikit-learn
```

## Optional: Save dependency versions
```bash
pip freeze > requirements.txt
```

A sample minimal `requirements.txt` could look like:
```text
numpy
pandas
scikit-learn
```

---

# How to Run the Project

## Step 1: Place the files
Make sure the following files are in the same working directory:
- `mnist_train.csv`
- `mnist_test.csv`
- `himanshu_pandey_A2.py` or `himanshu_pandey_A2.ipynb`

## Step 2: Run the Python script
```bash
python himanshu_pandey_A2.py
```

## Step 3: Or run in Jupyter Notebook
```bash
jupyter notebook
```
Then open `himanshu_pandey_A2.ipynb` and execute the cells in order.

---

# Step-by-Step Procedure Followed

This section explains the workflow in a reproducible way.

## Data Loading
The CSV files were loaded using `pandas.read_csv()`.  
The label column was separated from the pixel feature columns.

- `X_train_full` = training features
- `y_train_full` = training labels
- `X_test` = test features
- `y_test` = test labels

## Train–Validation Split
The original training set was split into:
- training split
- validation split

This was done so that model selection and tuning could be carried out using validation data without touching the final test set.

## Feature Scaling
`MaxAbsScaler` was used for scaling. This is suitable for high-dimensional pixel data and helps stabilize optimization.

## Linear Model
A logistic regression style classifier was implemented using:
- `SGDClassifier`
- `loss="log_loss"`
- `penalty="l2"`

Different values of the regularization parameter **alpha** were tested:
- 0.0001
- 0.0003
- 0.0010

The best alpha was selected using **validation macro F1 score**.

## Quadratic Feature Model
To introduce non-linearity while avoiding memory issues, a compact polynomial expansion was used.

Instead of expanding all 784 features into a full quadratic space, quadratic features were added only for selected high-variance pixels. This kept the feature count manageable and avoided RAM overflow.

Final quadratic feature count:
- **1604 features**

## Neural Network
Multiple neural network architectures were evaluated using `MLPClassifier`.  
Architectures tested:
- (128)
- (256)
- (128, 64)
- (256, 128)

The best architecture was selected using validation macro F1 score.

## Threshold Analysis
The effect of changing the decision threshold for logistic regression was analyzed.  
Only predictions above a confidence threshold were accepted; the rest were treated as unclassified.

This allowed the study of:
- **macro F1 on covered cases**
- **coverage**

## Unsupervised Clustering
A scenario without labels was simulated using:
- `MiniBatchKMeans`

Different numbers of clusters were tested:
- 100
- 200
- 300

Clusters were assigned labels using **majority voting**, and test data was classified using the learned cluster-to-label mapping.

---

# Evaluation Metrics

The following metrics were used throughout the project:

- **Macro Precision**
- **Macro Recall**
- **Macro F1 Score**
- **Training Time**
- **Coverage** (for threshold analysis)

## Why Macro Metrics?
Macro metrics treat all digit classes equally. This is useful in multi-class digit classification because it ensures balanced evaluation across all classes.

---

#  Results and Discussion

## Question (a): Linear vs Quadratic Logistic Regression

### Validation Results : Linear Model

| Alpha | Macro Precision | Macro Recall | Macro F1 | Training Time (sec) |
|------:|----------------:|-------------:|---------:|--------------------:|
| 0.0001 | 0.9114 | 0.9105 | 0.9105 | 29.27 |
| 0.0003 | 0.9104 | 0.9099 | 0.9098 | 20.08 |
| 0.0010 | 0.9058 | 0.9049 | 0.9050 | 16.96 |

Best alpha for linear model:
- **alpha = 0.0001**

### Final Test Performance : Linear Model

| Metric | Value |
|--------|------:|
| Macro Precision | 0.9132 |
| Macro Recall | 0.9131 |
| Macro F1 | 0.9128 |
| Training Time (sec) | 33.53 |

### Validation Results : Quadratic Model

| Alpha | Macro Precision | Macro Recall | Macro F1 | Training Time (sec) | Features |
|------:|----------------:|-------------:|---------:|--------------------:|---------:|
| 0.0001 | 0.9329 | 0.9324 | 0.9325 | 64.25 | 1604 |
| 0.0003 | 0.9318 | 0.9312 | 0.9313 | 52.94 | 1604 |
| 0.0010 | 0.9275 | 0.9268 | 0.9268 | 35.99 | 1604 |

Best alpha for quadratic model:
- **alpha = 0.0001**

### Final Test Performance : Quadratic Model

| Metric | Value |
|--------|------:|
| Macro Precision | 0.9425 |
| Macro Recall | 0.9427 |
| Macro F1 | 0.9423 |
| Training Time (sec) | 85.11 |
| Feature Count | 1604 |

### Comparison : Linear vs Quadratic

| Model | Validation F1 | Test Macro F1 | Training Time (sec) | Features |
|-------|--------------:|--------------:|--------------------:|---------:|
| Linear | 0.9105 | 0.9128 | 33.53 | 784 |
| Quadratic | 0.9325 | 0.9423 | 85.11 | 1604 |

### Discussion
The quadratic model clearly improves performance over the linear model by capturing non-linear interactions among pixel values. The test macro F1 increases from **0.9128** to **0.9423**, an improvement of approximately **2.95 percentage points**. However, this comes at the cost of increased feature dimensionality and substantially higher training time.

---

## Question (b): Effect of Regularization

From the tuning results, the best regularization parameter remains the same for both models:

- **Linear model:** alpha = 0.0001
- **Quadratic model:** alpha = 0.0001

Although the optimal alpha does not change numerically, regularization becomes more important in the quadratic setting because the model is more complex and has more features. As alpha increases, validation F1 decreases in both models, indicating underfitting.

---

## Question (c): Neural Networks

### Validation Results: Neural Network Architectures

| Architecture | Macro Precision | Macro Recall | Macro F1 | Training Time (sec) | Epochs |
|--------------|----------------:|-------------:|---------:|--------------------:|-------:|
| (256, 128) | 0.9797 | 0.9796 | 0.9796 | 53.27 | 20 |
| (128, 64) | 0.9743 | 0.9742 | 0.9742 | 27.09 | 17 |
| (256,) | 0.9724 | 0.9721 | 0.9721 | 33.85 | 15 |
| (128,) | 0.9705 | 0.9705 | 0.9704 | 21.91 | 18 |

Best neural network architecture:
- **(256, 128)**

### Final Test Performance : Neural Network

| Metric | Value |
|--------|------:|
| Macro Precision | 0.9818 |
| Macro Recall | 0.9818 |
| Macro F1 | 0.9818 |
| Training Time (sec) | 62.81 |
| Epochs Used | 17 |

### Comparison: Neural Network vs Quadratic Logistic Regression

| Model | Test Macro F1 | Training Time (sec) |
|-------|--------------:|--------------------:|
| Logistic Regression (Quadratic) | 0.9423 | 85.11 |
| Neural Network (256, 128) | 0.9818 | 62.81 |

### Discussion
The neural network significantly outperforms logistic regression with quadratic features. It improves test macro F1 from **0.9423** to **0.9818**, which is an increase of approximately **3.95 percentage points**. It also trains faster in this setup. This shows that neural networks are better suited for capturing the complex non-linear structure of image data.

---

## Question (d): Threshold Tuning

### Threshold Results

| Threshold | Coverage | Macro F1 on Covered Cases |
|----------:|---------:|--------------------------:|
| 0.3 | 0.9996 | 0.9132 |
| 0.5 | 0.9649 | 0.9312 |
| 0.7 | 0.8216 | 0.9660 |
| 0.9 | 0.5214 | 0.9866 |

### Discussion
As the threshold increases, the macro F1 score on the covered cases improves, but coverage decreases sharply.

Examples:
- At threshold **0.3**, coverage is about **99.96%**, with macro F1 around **91.32%**
- At threshold **0.9**, macro F1 rises to about **98.66%**, but coverage drops to about **52.14%**

This is not a good strategy for digit classification in practice because the task requires assigning a label to every image. A high threshold leaves too many samples unclassified.

---

## Question (e): Unsupervised Clustering with Cluster-level Labeling

### Clustering Results

| Number of Clusters | Macro Precision | Macro Recall | Macro F1 | Training Time (sec) |
|-------------------:|----------------:|-------------:|---------:|--------------------:|
| 100 | 0.8594 | 0.8562 | 0.8557 | 20.54 |
| 200 | 0.9016 | 0.8995 | 0.8994 | 36.60 |
| 300 | 0.9101 | 0.9092 | 0.9090 | 58.28 |

### Comparison with Supervised Models

| Model | Test Macro F1 |
|-------|--------------:|
| Clustering-based (k = 300) | 0.9090 |
| Logistic Regression (Linear) | 0.9128 |
| Logistic Regression (Quadratic) | 0.9423 |
| Neural Network (MLP) | 0.9818 |

### Discussion
The clustering-based approach provides a reasonable result even without labels, especially when the number of clusters is increased. Performance improves from **0.8557** at **100 clusters** to **0.9090** at **300 clusters**. However, it still underperforms compared to supervised methods, because clustering does not use class label information during training.

This approach is practical when labels are unavailable and annotation effort must be reduced, but it is not the best option when maximum predictive performance is required.

---

# Final Conclusions

The overall findings of this project are:

1. **Quadratic features improve logistic regression performance** compared to a purely linear model.
2. **Neural networks provide the best overall performance**, with the highest macro F1 and lower training time than the quadratic logistic model in this experiment.
3. **Threshold tuning increases F1 only by reducing coverage**, so it is not suitable when every sample must be classified.
4. **Clustering is useful when labels are unavailable**, but it cannot match the performance of supervised learning.

These results align well with the MNIST dataset, where high performance is typically expected from both classical machine learning models and neural networks.

---

# Reproducibility Notes

To reproduce the results:
- keep the same train/validation split strategy,
- use the same hyperparameter values,
- keep the same random seed (`random_state=42`) where applied,
- run the code in the same order.

Minor differences may appear across systems or library versions, but the overall trends and conclusions should remain the same.

---

# Troubleshooting Guide

## Problem: File not found
Make sure:
- `mnist_train.csv` and `mnist_test.csv` are in the working directory
- the filenames are exactly correct

## Problem: Slow runtime
This is normal for:
- quadratic feature expansion
- neural network training
- KMeans clustering

If needed:
- close other heavy applications
- run the notebook cell by cell

## Problem: Memory issues
Do not generate a full quadratic expansion for all 784 features unless your system has very large RAM. The compact polynomial strategy used in this project is safer.

## Problem: Different numbers
Small numerical differences can happen because of:
- library version differences
- platform differences
- convergence variation

## Thank You
---
