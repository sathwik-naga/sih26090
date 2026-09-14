/**
 * Craft business logic service - Ready for future DB queries
 */
export class CraftService {
  static formatProductResponse(product) {
    return {
      ...product,
      verifiedArtisan: true,
      directSourcing: true,
    };
  }
}

export default CraftService;
