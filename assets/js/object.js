const streets = [
    { id: 0,  name: "Boulevard de Belleville", color: "brown", price: 60 },
    { id: 1,  name: "Rue Lecourbe", color: "brown", price: 60 },

    { id: 2,  name: "Rue de Vaugirard", color: "cyan", price: 100 },
    { id: 3,  name: "Rue de Courcelles", color: "cyan", price: 100 },
    { id: 4,  name: "Avenue de la République", color: "cyan", price: 120 },

    { id: 5,  name: "Boulevard de la Villette", color: "magenta", price: 140 },
    { id: 6,  name: "Avenue de Neuilly", color: "magenta", price: 140 },
    { id: 7,  name: "Rue de Paradis", color: "magenta", price: 160 },

    { id: 8,  name: "Avenue Mozart", color: "orange", price: 180 },
    { id: 9, name: "Boulevard Saint-Michel", color: "orange", price: 180 },
    { id: 10, name: "Place Pigalle", color: "orange", price: 200 },

    { id: 11, name: "Avenue Matignon", color: "red", price: 220 },
    { id: 12, name: "Boulevard Malesherbes", color: "red", price: 220 },
    { id: 13, name: "Avenue Henri-Martin", color: "red", price: 240 },

    { id: 14, name: "Faubourg Saint-Honoré", color: "yellow", price: 260 },
    { id: 15, name: "Place de la Bourse", color: "yellow", price: 260 },
    { id: 16, name: "Rue La Fayette", color: "yellow", price: 280 },

    { id: 17, name: "Avenue de Breteuil", color: "green", price: 300 },
    { id: 18, name: "Avenue Foch", color: "green", price: 300 },
    { id: 19, name: "Boulevard des Capucines", color: "green", price: 320 },

    { id: 20, name: "Avenue des Champs-Élysées", color: "blue", price: 350 },
    { id: 21, name: "Rue de la Paix", color: "blue", price: 400 }
];

const companies = [
    { id: 0, name: "Gare Montparnasse", type: "railroad", price: 200 },
    { id: 1, name: "Gare de Lyon", type: "railroad", price: 200 },
    { id: 2, name: "Gare du Nord", type: "railroad", price: 200 },
    { id: 3, name: "Gare Saint-Lazare", type: "railroad", price: 200 },

    { id: 4, name: "Compagnie de l'Électricité", type: "utility", price: 150 },
    { id: 5, name: "Compagnie des Eaux", type: "utility", price: 150 }
];

const consumables = new Set([
    { id: 0, name: "Sortie de prison" }
]);

export default {streets: streets,   companies: companies, consumables: consumables};
