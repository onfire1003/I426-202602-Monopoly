const streets = [
    { id: 1,  name: "Boulevard de Belleville", color: "brown", price: 60, rent: 2, mortgage: 30 },
    { id: 3,  name: "Rue Lecourbe", color: "brown", price: 60, rent: 4, mortgage: 100 },

    { id: 6,  name: "Rue de Vaugirard", color: "cyan", price: 100, rent: 5, mortgage: 50 },
    { id: 8,  name: "Rue de Courcelles", color: "cyan", price: 100, rent: 5, mortgage: 50 },
    { id: 9,  name: "Avenue de la République", color: "cyan", price: 120, rent: 8, mortgage: 60 },

    { id: 11,  name: "Boulevard de la Villette", color: "magenta", price: 140, rent: 10, mortgage: 70 },
    { id: 13,  name: "Avenue de Neuilly", color: "magenta", price: 140, rent: 10, mortgage: 70 },
    { id: 14,  name: "Rue de Paradis", color: "magenta", price: 160, rent: 12, mortgage: 80 },

    { id: 16,  name: "Avenue Mozart", color: "orange", price: 180, rent: 14, mortgage: 90 },
    { id: 18, name: "Boulevard Saint-Michel", color: "orange", price: 180, rent: 14, mortgage: 90 },
    { id: 19, name: "Place Pigalle", color: "orange", price: 200, rent: 16, mortgage: 100 },

    { id: 21, name: "Avenue Matignon", color: "red", price: 220, rent: 18, mortgage: 110 },
    { id: 23, name: "Boulevard Malesherbes", color: "red", price: 220, rent: 18, mortgage: 110 },
    { id: 24, name: "Avenue Henri-Martin", color: "red", price: 240, rent: 20, mortgage: 120 },

    { id: 26, name: "Faubourg Saint-Honoré", color: "yellow", price: 260, rent: 22, mortgage: 130 },
    { id: 27, name: "Place de la Bourse", color: "yellow", price: 260, rent: 22, mortgage: 130 },
    { id: 29, name: "Rue La Fayette", color: "yellow", price: 280, rent: 24, mortgage: 140 },

    { id: 31, name: "Avenue de Breteuil", color: "green", price: 300, rent: 26, mortgage: 150 },
    { id: 32, name: "Avenue Foch", color: "green", price: 300, rent: 26, mortgage: 150 },
    { id: 34, name: "Boulevard des Capucines", color: "green", price: 320, rent: 28, mortgage: 160 },

    { id: 37, name: "Avenue des Champs-Élysées", color: "blue", price: 350, rent: 35, mortgage: 175 },
    { id: 39, name: "Rue de la Paix", color: "blue", price: 400, rent: 50, mortgage: 200 }
];

const companies = [
    { id: 5, name: "Gare Montparnasse", type: "station", price: 200, rent: 25, mortgage: 100 },
    { id: 15, name: "Gare de Lyon", type: "station", price: 200, rent: 25, mortgage: 100 },
    { id: 25, name: "Gare du Nord", type: "station", price: 200, rent: 25, mortgage: 100 },
    { id: 32, name: "Gare Saint-Lazare", type: "station", price: 200, rent: 25, mortgage: 100 },

    { id: 12, name: "Compagnie de l'Électricité", type: "company", price: 150, rent: 4, mortgage: 75 },
    { id: 28, name: "Compagnie des Eaux", type: "company", price: 150, rent:4, mortgage: 75 }
];

const consumables = new Set([
    { id: 0, name: "Sortie de prison" }
]);

export default {streets: streets,   companies: companies, consumables: consumables};
