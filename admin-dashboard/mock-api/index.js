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
import patients from './mockPatients.json' with {type: 'json'};
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
    const { username, password } = req.query;
     console.log('Login attempt:', username, password);


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
    //
const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) {
    return res.status(401).json({
      status: 401,
      message: 'Invalid username or password',
      data: null,
    });
  }
  //
    res.json({
        status: 200,
        message: "users fetched successfully",
        data: {
                token: '12345',
                user:user,
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
app.get('/api/categories', (req, res) => {
    console.log(req.query)
    res.json({
        status: 200,
        message: "Category fetched successfully",
        data: categories ,
    });
});
// test
app.get('/api/patients', (req, res) => {
    console.log(req.query)
    res.json({
        status: 200,
        message: "patient fetched successfully",
        data: patients ,
    });
});
app.get('/api/patients/:id', (req, res) => {
  const id = Number(req.params.id); // get ID from URL
  const patient = patients.find(p => p.id === id);

  if (!patient) {
    return res.status(404).json({ status: 404, message: 'Patient not found' });
  }

  res.json({
    status: 200,
    message: 'Patient fetched successfully',
    data: patient,
  });
});

// test end



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

// app.get('/api/patients', (req, res) => {
//   const {
//     currentPage = 1,
//     sort = 'name_asc',
//     categoryIds = '',
//     search = '',
//   } = req.query;


//   const limit = 9;
//   const page = parseInt(currentPage);
//   const parsedCategoryIds = categoryIds.split(',').map(Number);


//   // Filter by category IDs
//   let filteredPatients = patients;
//   if (categoryIds) {
//     filteredPatients = patients.filter(patient =>
//       parsedCategoryIds.includes(patient.patient_id)
//     );
//     console.log(patient)
//     console.log(filteredPatients)
//   }

  // Filter by search keyword
  // if (search) {
  //   const searchLower = search.toLowerCase();
  //   filteredPatients = filteredPatients.filter(patient =>
  //     patient.name.toLowerCase().includes(searchLower) ||
  //     patient.id === parseInt(search)
  //   );
  // }

  // // Sort products
  // let sortedPatients = [...filteredPatients];
  // switch (sort) {
  //   case 'name_asc':
  //     sortedPatients.sort((a, b) => a.name.localeCompare(b.name));
  //     break;
  //   case 'name_desc':
  //     sortedPatients.sort((a, b) => b.name.localeCompare(a.name));
  //     break;
  //   default:
  //     sortedPatients.sort((a, b) => a.name.localeCompare(b.name));
  // }

  // Pagination
//   const startIndex = (page - 1) * limit;
//   const paginatedPatients = sortedPatients.slice(startIndex, startIndex + limit);
//   const totalPages = Math.ceil(sortedPatients.length / limit);

//   res.json({
//     status: 200,
//     message: "Patient fetched successfully",
//     data: {
//       items: paginatedPatients,
//       pagination: {
//         total: sortedPatients.length,
//         currentPage: page,
//         totalPages: totalPages,
//       },
//     },
//   });
// });





const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default app;
