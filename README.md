
# Merhaba

Bu proje, blokzincir teknolojileri üzerinde geliştirme yapmak isteyenler için bir örnek proje niteliğindedir. Bu proje, Nestjs kullanılarak oluşturulan bir blokzincir servisidir ve web3.js kütüphanesi kullanarak yerelde çalıştırdığımız Ganache Ethereum duğümünün (.ing node) blokzincirine bağlanır. Aynı zamanda IPFS (InterPlanetary File System) protokolünü de kullanılarak depolanmak istenen görseller burada dağınık şekilde herhangi bir ücret ödemeden depolanır ve blokzincir servisi ile entegre çalışır.


# Başlangıç

Bu proje yerel bir makinede çalıştırılmak isteniyorsa, öncelikle aşağıdaki adımların takip edilmesi gerekmektedir.


# Ön Gereksinimler

    Node.js 18 veya daha yüksek sürümü, 18 tavsiye edilir.
    Docker Desktop ya da Docker Engine


# Yükleme

Bu proje klonlanarak yerel makineye indirilebilir. Aşağıdaki komutları kullanarak projeyi klonlayabilirsiniz.

```bash
git clone https://github.com/bitirmeProjesi2023/blockchain-service.git
```


Proje klonlandıktan sonra, projenin klasörüne gidin ve aşağıdaki komutu çalıştırın.

```bash
cd blockchain-service
npm install
```

Bu komut,indirilen repo'ya gider ve projenin bağımlılıklarını yükler.


# Çalıştırma

Bu projeyi çalıştırmak için öncelikle Docker'ın çalışır durumda olduğundan emin olun ve docker compose komutunu çalıştırın, bu komut gerekli imageları indirir ve kurar; ganache, ipfs-kubo, mysql gibi

```bash
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
