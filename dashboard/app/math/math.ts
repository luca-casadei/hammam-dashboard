export default class MathUtilities {
    private readonly mu: number;
    private readonly sigma: number;

    public constructor(sigma: number, mu: number) {
        this.mu = mu;
    }

    private normalExponent(x: number, sigma: number): number {
        return -1 / 2 * (((x - this.mu) / sigma) ** 2);
    }

    private normalFractal(sigma: number) {
        return 1 / (sigma * Math.sqrt(2 * Math.PI));
    }

    public normalDistributionFunction(x: number, sigma: number): number {
        return this.normalFractal(sigma) * Math.exp(this.normalExponent(x, sigma));
    }
}