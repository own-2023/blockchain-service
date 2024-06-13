
It's a blockchain service created using Nestjs and connects to the blockchain of a locally running Ganache Ethereum node using the web3.js library. Additionally, images intended for storage are stored here in a decentralized manner using the IPFS (InterPlanetary File System) protocol without any fees, and it integrates with the blockchain service.


# Başlangıç

Bu proje yerel bir makinede çalıştırılmak isteniyorsa, öncelikle aşağıdaki adımların takip edilmesi gerekmektedir.


# Requirements

   Node.js version 18 or higher, 18 is recommended.
Docker Desktop or Docker Engine


# Usage

This command installs project dependencicies

```bash
npm install
```

# Çalıştırma

Bu projeyi çalıştırmak için öncelikle Docker'ın çalışır durumda olduğundan emin olun ve docker compose komutunu çalıştırın, bu komut gerekli imageları indirir ve kurar; ganache, ipfs-kubo, mysql gibi

```bashser
docker compose up
```


Ardından, aşağıdaki komutu kullanarak blokzincir servisini çalıştırın.
```bash
npm run start:dev
```

## Test Etme

Bu proje, Jest kullanılarak test edilir. Aşağıdaki komutu kullanarak testleri çalıştırabilirsiniz.Daha test dosyaları yazılmadı

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
