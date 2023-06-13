CREATE TABLE `ethereum_accounts` (
  `address` varchar(255) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `private_key` varchar(255) NOT NULL,
  `nonce` int NOT NULL DEFAULT '0',
  `balance` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`address`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `ipfs` (
  `id` varchar(36) NOT NULL,
  `creator_id` varchar(255) NOT NULL,
  `cid` varchar(255) NOT NULL,
  `nft_name` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `price` varchar(255) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `nfts` (
  `nft_id` varchar(36) NOT NULL PRIMARY KEY,
  `owner_id` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `price` int NOT NULL DEFAULT '0',
  `isOnSale` tinyint NOT NULL DEFAULT '0',
  `isMinted` tinyint NOT NULL DEFAULT '0',
  `ipfs_id` varchar(255) NOT NULL,
  `token_id` varchar(255) DEFAULT NULL,
  KEY `FK_941d4dcf75c81fca776550a1dac` (`ipfs_id`),
  CONSTRAINT `FK_941d4dcf75c81fca776550a1dac` FOREIGN KEY (`ipfs_id`) REFERENCES `ipfs` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO db.ethereum_accounts (address,user_id,private_key,nonce) VALUES
	 ('0x5A49F6078817CE47874AB8D25CB3C7d7bC16810a','3d0de35b-580b-4d08-b105-b30afa0ded6e','0x454d0c0dfc495bac27ad5d0516de1ab5886d12414db8b88a862f55e047487a71',0),
	 ('0xCEC3Da0BfD82dDeD4f85bF0Ff982C7a1266364D6','05a834a6-a833-4541-9c23-233199477c9e','0x16e278b34c8e8972f62e489d116e8c7a6a40696a6b1836563cd0f51427a155e8',0);