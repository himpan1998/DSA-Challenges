# Assignment 2: OCR with Non-linear Models

**Course:** Machine Learning for Public Policy (SPL 8810)  
**Submission Date:** 23 April, 2026  
**Student:** Himanshu Pandey  
**Entry No.:** 2025SMZ8477  
**Instructor:** Prof. Sugat Chaturvedi  

---

# Problem Statement

This assignment focuses on **handwritten digit classification** using the **MNIST dataset**. The goal is to compare multiple machine learning approaches ranging from linear models to neural networks and unsupervised learning.

---

# Dataset

- Training Data: 60,000 samples  
- Test Data: 10,000 samples  
- Features: 784 pixels (28×28 grayscale images)  
- Classes: Digits 0–9  

---

# Methods Used

1. Logistic Regression (Linear)
2. Logistic Regression (Quadratic Features)
3. Neural Networks (MLP)
4. Threshold Analysis
5. Clustering (MiniBatch K-Means)

---

# Methodology

## Linear Model
- Model: SGDClassifier (logistic regression)
- Features: 784 pixels
- Best α = 0.0001

---

## Quadratic Model
To avoid memory issues:
- Selected top high-variance pixels
- Applied quadratic expansion only on selected features

Final configuration:
- k = 100  
- α = 0.0001  
- Features = 5834  

---

## Neural Network
Tested architectures:
- (128), (256), (128,64), (256,128)

Best:
- (256, 128)

---

## Clustering
- MiniBatch K-Means
- k = 100, 200, 300
- Labels assigned via majority voting

---

# Results

## Linear Model

| Metric | Value |
|--------|------:|
| Precision | 0.9132 |
| Recall | 0.9131 |
| F1 Score | 0.9128 |
| Time | ~34 sec |

---

## Quadratic Model (Final Tuned)

| Metric | Value |
|--------|------:|
| Precision | 0.9516 |
| Recall | 0.9509 |
| F1 Score | 0.9507 |
| Time | ~290 sec |
| Features | 5834 |

---

## Neural Network

| Metric | Value |
|--------|------:|
| Precision | 0.9818 |
| Recall | 0.9818 |
| F1 Score | 0.9818 |
| Time | ~57–63 sec |

---

## Threshold Analysis

| Threshold | Coverage | F1 |
|----------|---------|----|
| 0.3 | 0.9996 | 0.9132 |
| 0.5 | 0.9649 | 0.9312 |
| 0.7 | 0.8216 | 0.9660 |
| 0.9 | 0.5214 | 0.9866 |

---

## Clustering Results

| k | F1 |
|--|----|
| 100 | 0.8557 |
| 200 | 0.8994 |
| 300 | 0.9090 |

---

# Model Comparison

## Linear vs Quadratic

| Model | F1 | Time | Features |
|------|----|------|---------|
| Linear | 0.9128 | ~34 sec | 784 |
| Quadratic | 0.9507 | ~290 sec | 5834 |

---

## Quadratic vs Neural Network

| Model | F1 | Time |
|------|----|------|
| Quadratic | 0.9507 | ~290 sec |
| Neural Network | 0.9818 | ~57 sec |

---

## Clustering vs Supervised

| Model | F1 |
|------|----|
| Clustering | 0.9090 |
| Linear | 0.9128 |
| Quadratic | 0.9507 |
| Neural Network | 0.9818 |

---

# Key Insights

- Quadratic features improve performance significantly  
- Neural networks give best results with lower time  
- Threshold tuning improves F1 but reduces coverage  
- Clustering works without labels but is less accurate  

---

# Conclusion

- Linear → strong baseline  
- Quadratic → higher accuracy, higher cost  
- Neural Network → best overall model  
- Clustering → useful without labels  

---

# Reproducibility

- Use same train-validation split  
- Use random_state = 42  
- Run notebook sequentially  

---

# Notes

- Small variations may occur due to system differences  
- Quadratic model uses optimized feature selection to avoid memory issues  

---

# Thank You
