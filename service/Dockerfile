FROM python:3.9.4-alpine

ENV PYTHONUNBUFFERED 1

COPY ./requirements.txt /requirements.txt

# Update pip
RUN pip install -U pip

RUN pip install -r /requirements.txt

RUN mkdir /app
WORKDIR /app
COPY ./app app
