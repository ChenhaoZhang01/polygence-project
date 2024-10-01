# %% Modules

import torch
from datasets import Dataset
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report, confusion_matrix, ConfusionMatrixDisplay
import tensorflow as tf
from tensorflow import keras
import tensorflow_hub as hub
#import tensorflow_text as text
from transformers import (
    RobertaTokenizerFast,
    RobertaForSequenceClassification,
    TrainingArguments,
    Trainer,
    AutoConfig,
)

from huggingface_hub import Repository, login

# # %% Create RoBERTa model
login(token='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')
repository_id = "Time4Taxes/PolygenceModel"

num_labels = 4
class_names = ["microagression", "maybe", "harmless", "harm"]
idx_to_label = { idx: label for idx, label in enumerate(class_names)}

model_id = "roberta-base"
config = AutoConfig.from_pretrained(model_id)
config.update({ "id2label": idx_to_label})
model = RobertaForSequenceClassification.from_pretrained(model_id, config = config)
tokenizer = RobertaTokenizerFast.from_pretrained(model_id)

# %% Dataset

dataset_df = pd.read_csv("./data/microaggressionsFinal.csv")
train_df, test_df = train_test_split(dataset_df, test_size = 0.2)
test_df, eval_df = train_test_split(test_df, test_size = 0.25)

train_dataset = Dataset.from_pandas(train_df)
test_dataset = Dataset.from_pandas(test_df)
eval_dataset = Dataset.from_pandas(eval_df)

def preprocess(dataset):
    tokenized = tokenizer(dataset["sentence"], truncation = True, padding = "max_length", max_length = 128)
    return tokenized

train_dataset = train_dataset.map(preprocess, batched = True, remove_columns = "sentence")
test_dataset = test_dataset.map(preprocess, batched = True, remove_columns = "sentence")
eval_dataset = eval_dataset.map(preprocess, batched = True, remove_columns = "sentence")

train_dataset.set_format("torch", columns = ["input_ids", "attention_mask", "label"])
test_dataset.set_format("torch", columns = ["input_ids", "attention_mask", "label"])
eval_dataset.set_format("torch", columns = ["input_ids", "attention_mask", "label"])

# %%

for idx, line in enumerate(train_dataset["input_ids"]):
    print(idx, len(line))

# %% Classification

training_args = TrainingArguments(
    output_dir = repository_id,
    eval_strategy = "steps",
    learning_rate = 5.0e-05,
    num_train_epochs = 400,
    per_device_train_batch_size = 16,
    hub_model_id = repository_id,
    save_steps=20000,
)

trainer = Trainer(
    model = model,
    args = training_args,
    train_dataset = train_dataset,
    eval_dataset = eval_dataset,
)

trainer.train()

# %% Evaluate model

trainer.evaluate()

# %% Save model

tokenizer.save_pretrained(repository_id)
trainer.create_model_card()
trainer.push_to_hub()

# %% 

from transformers import pipeline

classifier = pipeline("text-classification", repository_id, device=0)

# %%

sentence = "But you are too strong to be raped."
result = classifier(sentence)

print("Sentence '%s' is '%s'" % (sentence, result[0]["label"]))

# %% End of script






# df = pd.read_csv("./data/microaggressions1.csv")

# # Convert pandas dataframe to numpy array
# data = df.to_numpy()

# # Extract comments from column 0
# comments = data[:, 0]

# # Extract labels from column 1 
# labels = data[:, 1]


#==============================================================================    
#========================== Exploratoy Data Analysis ==========================
#============================================================================== 

# # Histogram of labels
# plt.hist(labels, color="steelblue", edgecolor="black")
# plt.xlabel("Value")
# plt.ylabel("Frequency")
# plt.title("Hate Speech Labels")
# plt.show()

# # Dichotomize labels (hate speech: 0 = no, 1 = yes) 
# # Decision criterion: Hate speech if minimum 50% of reviewers rated the comment as hate speech 
# labels = labels.astype(int)

# # Histogram of binary labels
# plt.hist(labels, color="steelblue", edgecolor="black")
# plt.xlabel("Value")
# plt.ylabel("Frequency")
# plt.title("Hate Speech Binary Labels")
# plt.show()

# # Label frequencies
# num_hate_comments = len(labels[labels == 3])
# num_no_hate_comments = len(labels[labels == 0])
# percent_hate_comments = np.round(num_hate_comments/len(labels)*100,2)
# percent_no_hate_comments = np.round(num_no_hate_comments/len(labels)*100,2)
# print("Number of hate speech comments")
# print(f"Hate speech: {num_hate_comments} comments ({percent_hate_comments}%)")
# print(f"No Hate Speech: {num_no_hate_comments} comments ({percent_no_hate_comments}%)")
# print("="*20)

# # Comment length
# comment_length = [len(comment) for comment in comments]
# # Histogram of comment length
# plt.hist(comment_length, bins=200)
# plt.xlabel("Number of words per comment")
# plt.ylabel("Counts")
# plt.show()
# # Histogram of comment length from 0 to 700 words
# plt.hist(comment_length, bins=200)
# plt.xlabel("Number of words per comment")
# plt.ylabel("Counts")
# plt.xlim(0, 700)
# plt.show()
# # Mean, Std, Min, Max
# print("Comment Length")
# print(f"Mean: {np.round(np.array(comment_length).mean())} words")
# print(f"Std: {np.round(np.array(comment_length).std())} words")
# print(f"Min: {np.round(np.array(comment_length).min())} words")
# print(f"Max: {np.round(np.array(comment_length).max())} words")
# print("="*20)

# # Display first 10 comments
# print("Here are 10 example comments.")
# for i in range(10):
#     print(f"Comment {i+1}: {comments[i]}")
# print("="*20) 


# #==============================================================================    
# #=============================== Model Building ===============================
# #============================================================================== 

# # Split dataset into training and test data 
# comments_train, comments_test, labels_train, labels_test = train_test_split(
#     comments, labels, test_size=0.3, random_state=42)

# # Initialize instance for early stopping (used in all models)
# early_stopping = keras.callbacks.EarlyStopping(
#     monitor="val_accuracy",
#     mode="max",
#     patience=20,
#     restore_best_weights=True)

# # Specify dropout rate (used in all models) 
# dropout_rate = 0.5


# # Specify the input layer
# text_input = keras.layers.Input(shape=(), dtype=tf.string, name="text")

# # Preprocess the text inputs using the BERT preprocessing layer
# preprocessor = hub.KerasLayer("https://tfhub.dev/tensorflow/bert_en_uncased_preprocess/3",
#                               name="preprocessing")
# preprocessed_inputs = preprocessor(text_input)  # sequence length of preprocessed inputs is 128 tokens

# # Load the BERT model
# bert = hub.KerasLayer("https://tfhub.dev/tensorflow/small_bert/bert_en_uncased_L-4_H-512_A-8/2",
#                       trainable=True, 
#                       name="BERT")

# # Pass the preprocessed text inputs through the BERT model
# bert_outputs = bert(preprocessed_inputs)

# # Extract the pooled output from the BERT outputs
# pooled_bert_output = bert_outputs["pooled_output"]

# # Apply dropout regularization
# pooled_bert_output = keras.layers.Dropout(dropout_rate)(pooled_bert_output)

# # Fine-tune the BERT model with dense layers for the hate speech detection task
# dense = keras.layers.Dense(128, activation="relu")(pooled_bert_output)
# outputs = keras.layers.Dense(1, activation="sigmoid", name="classifier")(dense)

# # Create model
# model3 = keras.Model(inputs=text_input, outputs=outputs)

# # Summarize model 
# model3.summary()

# # Compile model 
# optimizer = keras.optimizers.Adam(learning_rate=0.0001)
# model3.compile(optimizer=optimizer, 
#                loss="binary_crossentropy",
#                metrics=["accuracy"])
# train_dataset = tf.data.Dataset.from_tensor_slices((comments_train, labels_train)).batch(8)
# test_dataset = tf.data.Dataset.from_tensor_slices((comments_test, labels_test)).batch(8)
# # Fit model
# model3_history = model3.fit(train_dataset,
#                             epochs=333,
#                             validation_data=test_dataset,
#                             callbacks=early_stopping)

# # Save model    
# model3.save("./Time4Taxes/PolygenceModel")
# repo = Repository(local_dir="./Time4Taxes/PolygenceModel", clone_from=repository_id)
# repo.push_to_hub()
# # Load model
# model3 = keras.models.load_model("./Time4Taxes/PolygenceModel")

# # Learning curve: Loss
# plt.plot(model3_history.history["loss"], label="Train Loss")
# plt.plot(model3_history.history["val_loss"], label="Test Loss")
# plt.xlabel("Epoch")
# plt.ylabel("Loss")
# plt.legend()
# plt.show()
    
# # Learning curve: Accuracy
# plt.plot(model3_history.history["accuracy"], label="Train Accuracy")
# plt.plot(model3_history.history["val_accuracy"], label="Test Accuracy")
# plt.xlabel("Epoch")
# plt.ylabel("Accuracy")
# plt.legend()
# plt.show()

# # Evaluate model: Accuracy for training and test data
# train_score_model3 = model3.evaluate(comments_train, labels_train)
# test_score_model3 = model3.evaluate(comments_test, labels_test)
# print("Accuracy Train data: ", train_score_model3[1])
# print("Accuracy Test data: ", test_score_model3[1])

# # Predicted labels for test data 
# labels_pred_prob_model3 = model3.predict(comments_test)
# labels_pred_model3 = labels_pred_prob_model3.copy()

# 
# # Evalute model: Classification report for test data
# print("Classification Report: Model 3 (Bert)")
# print(classification_report(labels_test, labels_pred_model3))

# # Evaluate model: Confusion matrix for test data
# cm = confusion_matrix(labels_test, labels_pred_model3)
# cm_disp = ConfusionMatrixDisplay(cm)
# cm_disp.plot()