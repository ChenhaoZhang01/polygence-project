# %% Modules

import torch
import pandas as pd

from datasets import Dataset
from sklearn.model_selection import train_test_split

from transformers import (
    RobertaTokenizerFast,
    RobertaForSequenceClassification,
    TrainingArguments,
    Trainer,
    AutoConfig,
)

from huggingface_hub import HfFolder, notebook_login

# %% Create RoBERTa model

repository_id = "metalcycling/microagressions"

num_labels = 3
class_names = ["microagression", "undefined", "harmless"]
idx_to_label = { idx: label for idx, label in enumerate(class_names)}

model_id = "roberta-base"
config = AutoConfig.from_pretrained(model_id)
config.update({ "id2label": idx_to_label})
model = RobertaForSequenceClassification.from_pretrained(model_id, config = config)
tokenizer = RobertaTokenizerFast.from_pretrained(model_id)

# %% Dataset

dataset_df = pd.read_csv("data/microaggressions.csv")
train_df, test_df = train_test_split(dataset_df, test_size = 0.2)
test_df, eval_df = train_test_split(test_df, test_size = 0.25)

train_dataset = Dataset.from_pandas(train_df)
test_dataset = Dataset.from_pandas(test_df)
eval_dataset = Dataset.from_pandas(eval_df)

def preprocess(dataset):
    tokenized = tokenizer(dataset["sentence"], truncation = True, padding = True, max_length = 256)
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
    num_train_epochs = 10,
    per_device_train_batch_size = 16,
    hub_model_id = repository_id,
    hub_token = HfFolder.get_token(),
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

classifier = pipeline("text-classification", repository_id)

# %%

sentence = "But you are too strong to be raped."
result = classifier(text)

print("Sentence '%s' is '%s'" % (sentence, result[0]["label"]))

# %% End of script
