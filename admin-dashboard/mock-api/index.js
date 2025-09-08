import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import products from './mockDatabase.json' with { type: "json" };
import bestsellers from './mockBestsellers.json' with { type: "json" };
import theme1 from './theme1.json' with { type: "json" };
import theme2 from './theme2.json' with { type: "json" };
import theme3 from './theme3.json' with { type: "json" };

import shopSetup from './shopSetup.json' with {type: 'json'};
import fonts from './fonts.json' with {type: 'json'};
import colorOptions from './color-options.json' with {type: 'json'};
import orderFormOptions from './order-form.json' with {type: 'json'};
import categories from './mockCategories.json' with {type: 'json'};
import discounts from './mockDiscounts.json' with {type: 'json'};
import domainTracking from './mockDomianTracking.json' with { type: "json" };
import seoMetaTags from './seoMetaTags.json' with { type: "json" };


dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

// API Routes
app.get('/api/users', (req, res) => {
    console.log(req.query)


    const users = [
      {
        id: 1,
        username: 'admin',
        password: '1234',
        role: 'Admin',
        name: 'Admin User',
        profilePictureUrl: 'https://example.com/profile/admin.jpg',
      },
      {
        id: 2,
        username: 'readonly',
        password: '4321',
        role: 'Readonly',
        name: 'Readonly User',
        profilePictureUrl: 'https://example.com/profile/admin.jpg',
      },
    ];
    // const authState = {
    //   token: '12345',
    //   user: users[0],
    //   error: null,
    //   loading: false,
    // };



    res.json({
        status: 200,
        message: "Products fetched successfully",
        data: {
                token: '12345',
                user: users[0],
                error: null,
                loading: false,
        },
    });
});

app.get('/api/theme', (req, res) => {
    console.log(req.query)
    res.json({
        status: 200,
        message: "Theme fetched successfully",
        theme: theme1,
    });
});




app.get('/api/products', (req, res) => {
  const {
    currentPage = 1,
    sort = 'name_asc',
    categoryIds = '',
    minPrice = 0,
    maxPrice = Infinity,
    search = '',
  } = req.query;


  const limit = 9;
  const page = parseInt(currentPage);
  const parsedCategoryIds = categoryIds.split(',').map(Number);
  const parsedMinPrice = parseFloat(minPrice);
  const parsedMaxPrice = parseFloat(maxPrice);

  // Filter by category IDs
  let filteredProducts = products;
  if (categoryIds) {
    filteredProducts = products.filter(product =>
      parsedCategoryIds.includes(product.category_id)
    );
    console.log(products)
    console.log(filteredProducts)
  }

  // Filter by price range
  filteredProducts = filteredProducts.filter(product =>
    product.price_after_discount >= parsedMinPrice &&
    product.price_after_discount <= parsedMaxPrice
  );

  // Filter by search keyword
  if (search) {
    const searchLower = search.toLowerCase();
    filteredProducts = filteredProducts.filter(product =>
      product.name.toLowerCase().includes(searchLower) ||
      product.id === parseInt(search)
    );
  }

  // Sort products
  let sortedProducts = [...filteredProducts];
  switch (sort) {
    case 'price_asc':
      sortedProducts.sort((a, b) => a.price_after_discount - b.price_after_discount);
      break;
    case 'price_desc':
      sortedProducts.sort((a, b) => b.price_after_discount - a.price_after_discount);
      break;
    case 'name_asc':
      sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'name_desc':
      sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
      break;
    default:
      sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
  }

  // Pagination
  const startIndex = (page - 1) * limit;
  const paginatedProducts = sortedProducts.slice(startIndex, startIndex + limit);
  const totalPages = Math.ceil(sortedProducts.length / limit);

  res.json({
    status: 200,
    message: "Products fetched successfully",
    data: {
      items: paginatedProducts,
      pagination: {
        total: sortedProducts.length,
        currentPage: page,
        totalPages: totalPages,
      },
    },
  });
});





const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default app;
