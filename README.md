

# Thoughts 


## getting summoner INFO 

GETTINg live game info for specific summoner:
POST
	https://ingame-basic-test.deeplol-gg.workers.dev/

Multipart Form Data 
puu_id
platform_id


```
GET	https://b2c-api-cdn.deeplol.gg/ingame/summoner-cached?summoner_id=1Fu0p4vJvqs1PXNYr151rGZ7C2x6fbzYWwMOIZi7oiggAaQ&platform_id=EUW1

GET https://b2c-api-cdn.deeplol.gg/ingame/summoner-cached?summoner_id={encrypted_summoner_id}&platform_id=${PLATFORM_ID}

- for each summoner call API and get data



```
