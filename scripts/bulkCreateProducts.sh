curl --request POST \
  --url http://127.0.0.1:3333/graphql \
  --header 'Content-Type: application/json' \
  --header 'User-Agent: insomnia/9.2.0' \
  --data '{"query":"mutation{\n\tbulkCreateProducts(link: \n\t\t\"https://api.frw.co.uk/feeds/all_listings.csv\" \n\t)\n}"}'