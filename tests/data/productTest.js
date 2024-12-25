import { Product, Clothing, Appliance } from "../../data/products.js"


describe('Test Suite: test Product Class', () => {
    const cup = new Clothing({
        id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        image: "images/products/intermediate-composite-basketball.jpg",
        name: "Intermediate Size Basketball",
        rating: {
            stars: 4,
            count: 127
        },
        priceCents: 2095,
        keywords: [
            "sports",
            "basketballs"
        ]
    });

    it('Check Product Class', () => {
        expect(cup.getPrice()).toEqual('$20.95');
        expect(cup.name).toEqual('Intermediate Size Basketball');
        expect(cup.extraInfoHTML()).toContain('Size Chart');
    })
})