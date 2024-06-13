
Blockchain service created using Nestjs and connects to the blockchain of a locally running Ganache Ethereum node using the web3.js library. Additionally, images intended for storage are stored here in a decentralized manner using the IPFS (InterPlanetary File System) protocol without any fees, and it integrates with the blockchain service.


# Requirements

   Node.js version 18 or higher, 18 is recommended.
Docker Desktop or Docker Engine


# Usage

This command installs project dependencicies

```bash
npm install
```

To run this project, make sure Docker is running and execute the docker-compose command. This command will download and install the necessary images such as ganache, ipfs-kubo, mysql

```bashser
docker compose up
```
Run the blockchain service using the following command

```bash
npm run start:dev
```

## Testing

This project is tested using Jest. You can run the tests using the following command. 

```bash
# unit tests
$ npm run test
```

# Kullanım

Bu proje, NestJS kullanarak oluşturulan bir Node.js uygulamasıdır. Uygulama, aşağıdaki API endpointleri aracılığıyla kullanılabilir.

Bu endpoint, endpoint1 işlemini gerçekleştirir.

```bash

GET /endpoint1

```


Bu endpoint, endpoint2 işlemini gerçekleştirir.

```bash

GET /endpoint2

```


# Katkıda Bulunma

Bu proje, katkıda bulunmak isteyen geliştiriciler için açıktır. Lütfen değişiklikleriniz için bir pull request oluşturun ve açıklayıcı bir açıklama ekleyin.

# Lisans

Bu proje, MIT lisansı altında lisanslanmıştır.
