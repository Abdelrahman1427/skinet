using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.Entities;

namespace Core.Specification
{
    public class ProductSpecification : BaseSpecification<Product>
    {
        public ProductSpecification(ProductSpecParams specPrams) : base(x=>
            (string.IsNullOrEmpty(specPrams.Search) || x.Name.ToLower().Contains(specPrams.Search)) &&
            (specPrams.Brands.Count == 0 || specPrams.Brands.Contains(x.Brand)) &&
            (specPrams.Types.Count == 0 || specPrams.Types.Contains(x.Type))
        )
        {

            ApplyPaging(specPrams.PageSize * (specPrams.PageIndex - 1), specPrams.PageSize);

            switch (specPrams.Sort) 
            {
                case "priceAsc":
                    AddOrderBy(x => x.Price);
                    break;
                case "priceDesc":
                    AddOrderByDescending(x => x.Price);
                    break;
                default:
                    AddOrderBy(x => x.Name);
                    break;  
            }
            
        }

    }
}
