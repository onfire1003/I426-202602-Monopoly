const streets = [
    { id: 0,  name: "Boulevard de Belleville", color: "brown", price: 60, rent: 2 },
    { id: 1,  name: "Rue Lecourbe", color: "brown", price: 60, rent: 4 },

    { id: 2,  name: "Rue de Vaugirard", color: "cyan", price: 100, rent: 5 },
    { id: 3,  name: "Rue de Courcelles", color: "cyan", price: 100, rent: 5 },
    { id: 4,  name: "Avenue de la République", color: "cyan", price: 120, rent: 8 },

    { id: 5,  name: "Boulevard de la Villette", color: "magenta", price: 140, rent: 10 },
    { id: 6,  name: "Avenue de Neuilly", color: "magenta", price: 140, rent: 10 },
    { id: 7,  name: "Rue de Paradis", color: "magenta", price: 160, rent: 12 },

    { id: 8,  name: "Avenue Mozart", color: "orange", price: 180, rent: 14 },
    { id: 9, name: "Boulevard Saint-Michel", color: "orange", price: 180, rent: 14 },
    { id: 10, name: "Place Pigalle", color: "orange", price: 200, rent: 16 },

    { id: 11, name: "Avenue Matignon", color: "red", price: 220, rent: 18 },
    { id: 12, name: "Boulevard Malesherbes", color: "red", price: 220, rent: 18 },
    { id: 13, name: "Avenue Henri-Martin", color: "red", price: 240, rent: 20 },

    { id: 14, name: "Faubourg Saint-Honoré", color: "yellow", price: 260, rent: 22 },
    { id: 15, name: "Place de la Bourse", color: "yellow", price: 260, rent: 22 },
    { id: 16, name: "Rue La Fayette", color: "yellow", price: 280, rent: 24 },

    { id: 17, name: "Avenue de Breteuil", color: "green", price: 300, rent: 26 },
    { id: 18, name: "Avenue Foch", color: "green", price: 300, rent: 26 },
    { id: 19, name: "Boulevard des Capucines", color: "green", price: 320, rent: 28 },

    { id: 20, name: "Avenue des Champs-Élysées", color: "blue", price: 350, rent: 35 },
    { id: 21, name: "Rue de la Paix", color: "blue", price: 400, rent: 50 }
];

const companies = [
    { id: 0, name: "Gare Montparnasse", type: "station", price: 200, rent: 25 },
    { id: 1, name: "Gare de Lyon", type: "station", price: 200, rent: 25 },
    { id: 2, name: "Gare du Nord", type: "station", price: 200, rent: 25 },
    { id: 3, name: "Gare Saint-Lazare", type: "station", price: 200, rent: 25 },

    { id: 4, name: "Compagnie de l'Électricité", type: "company", price: 150, rent: 4 },
    { id: 5, name: "Compagnie des Eaux", type: "company", price: 150, rent:4 }
];

const consumables = new Set([
    { id: 0, name: "Sortie de prison" }
]);

export default {streets: streets,   companies: companies, consumables: consumables};
