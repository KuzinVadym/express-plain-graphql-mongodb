curl --request POST \
  --url http://127.0.0.1:3333/graphql \
  --header 'Content-Type: application/json' \
  --header 'User-Agent: insomnia/9.2.0' \
  --data '{"query":"mutation{\n\tcreateProducer (\n\t\tinput: {\n\t\t\tname: \"Moulis-en-Médoc AOP\",\n\t\t\tcountry: \"Frankreich\",\n\t\t\tregion: \"Bordeaux\"\n\t}){\n  _id\n  name\n\tcountry\t\n\tregion\t\n}}"}'