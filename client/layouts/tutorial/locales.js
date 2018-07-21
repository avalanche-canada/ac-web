import { FR, EN } from 'constants/locale'

export default new Map([
    [EN, new Map()],
    [
        FR,
        new Map([
            ['Start with', 'Débuter avec'],
            ['Visit the', 'Consulter le'],
            ['Next', 'Suivant'],
            ['Previous', 'Précédent'],
            ['Back to', 'De retour au'],
            ['Loading...', 'Chargement du tutoriel...'],
            ['Simple', 'Simple'],
            ['Challenging', 'Exigeant'],
            ['Complex', 'Complexe'],
            ['See answers', 'Voir les réponses'],
            ['Give another answer', 'Fournir une autre réponse'],
            ['Start again', 'Recommencer'],
            ['There is no document for', 'Aucun document trouvé pour'],
            [
                'Well done — You’re right!',
                "Bien jouer, c'est la bonne réponse !",
            ],
            [
                'Sorry, that isn’t the right answer. Try again!',
                "Désolé, ce n'est pas la bonne réponse. Essayer de nouveau !",
            ],
            ['Your answer is required.', 'Votre réponse est requise.'],
        ]),
    ],
])
