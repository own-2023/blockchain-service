
# Merhaba

Bu proje, blokzincir teknolojileri üzerinde geliştirme yapmak isteyenler için bir örnek proje niteliğindedir. Bu proje, Nestjs kullanılarak oluşturulan bir blokzincir servisidir ve web3.js kütüphanesi kullanarak yerelde çalıştırdığımız Ganache Ethereum duğümünün (.ing node) blokzincirine bağlanır. Aynı zamanda IPFS (InterPlanetary File System) protokolünü de kullanılarak depolanmak istenen görseller burada dağınık şekilde herhangi bir ücret ödemeden depolanır ve blokzincir servisi ile entegre çalışır.


# Başlangıç

Bu proje yerel bir makinede çalıştırılmak isteniyorsa, öncelikle aşağıdaki adımların takip edilmesi gerekmektedir.


# Ön Gereksinimler

    Node.js 18 veya daha yüksek sürümü
    Docker
    Ganache
    IPFS Desktop uygulaması


# Yükleme

Bu proje klonlanarak yerel makineye indirilebilir. Aşağıdaki komutları kullanarak projeyi klonlayabilirsiniz.

```bash
git clone https://github.com/bitirmeProjesi2023/blockchain-service.git
```


Proje klonlandıktan sonra, projenin klasörüne gidin ve aşağıdaki komutu çalıştırın.

```bash
npm install
```

Bu komut, projenin bağımlılıklarını yükler.


# Çalıştırma

Bu projeyi çalıştırmak için öncelikle ganache, IPFS Desktop uygulaması ve Docker'ın çalışır durumda olduğundan emin olun.

```bash
npm run start:dev
```


Ardından, aşağıdaki komutu kullanarak blokzincir servisini çalıştırın.

## Test Etme

Bu proje, Jest kullanılarak test edilir. Aşağıdaki komutu kullanarak testleri çalıştırabilirsiniz.Daha test doyasları yazılmadı

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
