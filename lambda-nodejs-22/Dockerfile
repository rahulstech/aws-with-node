# FROM amazon/aws-lamda-nodejs:22

FROM public.ecr.aws/lambda/nodejs:22

COPY app.js ${LAMBDA_TASK_ROOT}

CMD ["app.handler"]