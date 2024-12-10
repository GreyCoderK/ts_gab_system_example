# Système de guichet automatique de banque (GAB)

<center>
    Un guichet automatique de banque ou gab est un machine qui permet de performer un certains nombre d'opération à une carte magnétique. Lui permettant ainsi d'accéder à certains nombre de privilège dont l'utlisateur dispose avec pour restriction les quotas de validation de la carte déjà en paramètre.
</center>

## Configuration système requise

- Une opération peut-avoir différents type
- Une opération peut-avoir différentes validation
- Un package peut-avoir différents type
- Une carte bancaire peut avoir différents type
- La carte bancaire peut accéder à un compte
- un guichet automatique de banque à une carte bancaire
- Un guichet automatique peut accéder aux information d'une transaction
- Une transaction est efféctué sur un compte
- Chaque transaction est historisé
- Chaque authentification au gab est historisé

## Diagramme de cas d'utilisation

Voici les principaux acteurs de notre système:

- **Système**: charger d'éffectuer les vérifications lors de transactions de du client, le solde du guichet, valider le compte client et gérer la session utilisateur pendant laquelle il lui est permis de faire des opérations.
- **Customer**: le client cherchant à effectuer un opération dans le système.

Voici le diagramme de cas d'utilisation de notre système:

- Gestion de la session utilisateur
- Les vérification liés aux restriction de la carte ou le compte bancaire
- La consultation de compte
- La gestion de l'authentification du client
- L'historisation des transaction
- Les opération de transaction clients
- La consultation du solde guichet
- Le rechargement des billets dans le guichet

![Diagramme de cas d'utilisation](./images/usecase_diagram.drawio.svg)

## Diagramme de classe

Voici les principales classes de notre système de guichet automatique de banque:

- **Operation**: classe de base de toute les opérations
- **LoginOperation**: classe fille d'opération, en charge de la gestion des Login
- **LogoutOperation**: classe fille d'opération, en charge de la gestion des logout
- **SoldeOperation**: classe fille d'opération, en charge de la gestion des soldes
- **DepotOperation**: classe fille d'opération, en charge de la gestion des depôts
- **RetraitOperation**: classe fille d'opération, en charge de la gestion des retraits
- **HistoriqueOperation**: classe fille d'opération, en charge de la gestion des historiques
- **Historique**: classe de base des historiques
- **HistoriqueConnexion**: classe fille d'historique, en charge de la gestion des connexions
- **HistoriqueTransaction**: classe fille d'historique, en charge de la gestion des transactions
- **Package**: classe de base des offres
- **Start**: classe fille de Package
- **Elite**: classe fille de Package
- **Liberty**: classe fille de Package
- **CarteBancaire**: classe de base des cartes bancaires
- **Courant**: classe fille de carte bancaire
- **Epargne**: classe fille de carte bancaire
- **GAB**: represente le guichet automatique
- **Compte**: Represente un compte client
- **BaseValidation**: classe de base de validation
- **ConcreteValidation**: represente l'ensemble des validations que nous pourrons utiliser
- **ValidationInterface**: Interface qui doit être implémenter dans les classe de validations
- **PerformOperationInterface**: Interface qui doit être implémenter dans les classe de pouvant effectuer une operation
- **HistoriqueType**: enum des types d'historique
- **CompteType**: enum des types de compte
- **OperationType**: enum des types d'operation
- **PackageType**: enum des types d'historique

![Diagramme de classe](./images/class_diagram.drawio.svg)

<br/>
<center>Diagramme de classe</center>

## Diagramme de séquence

![Diagramme de séquence](./images/sequence_diagram.drawio.svg)

<br/>
<center>Diagramme de séquence</center>
