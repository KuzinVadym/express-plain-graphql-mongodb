
## Steps to play around


1. Copy env variables

```
cp .env.basic .env
```

2. Spin Up mongo and graphql-api

```
docker-compose up -d
```

3. Next step can be run one of the scripts to test usecases, for example

```
sh ./scripts/createProducer.sh
```


```
sh ./scripts/bulkCreateProducts.sh
```