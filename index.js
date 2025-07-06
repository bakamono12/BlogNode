const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Set EJS as template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Middleware for parsing form data
app.use(express.urlencoded({ extended: true }));

// Dummy blog posts data
const blogPosts = [
    {
        id: 1,
        title: 'Animating Link Underlines',
        category: 'CSS',
        date: 'August.18',
        content: `Here's how to create smooth animated underlines for links using CSS transitions and pseudo-elements.

A common way of styling links is to add an underline effect. But instead of using the default text-decoration, we can create custom animated underlines that provide better visual feedback.

The key is to use the ::after pseudo-element with transform properties:

.link {
  position: relative;
  text-decoration: none;
}

.link::after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  bottom: -2px;
  left: 0;
  background-color: #007bff;
  transition: width 0.3s ease;
}

.link:hover::after {
  width: 100%;
}

This creates a smooth animation effect when hovering over links.`
    },
    {
        id: 2,
        title: 'Breaking to a new row with flexbox',
        category: 'CSS',
        date: 'August.3',
        content: `Here's the challenge: if you want to create a flexbox layout with several rows of items, layout that looks something like this, with three stacked items and alternating full-width items.

A common way of controlling the positioning and size of flex items is to use width or flex-basis; if we set the fourth item to have a width of 100% it'll be positioned on its own row. But what if we don't want to or can't set the width of individual items, do we really need to? Or is there a way of just telling flexbox to line break at certain points?

There's no property that we can set on a flex item to make it break to a new row, but we can insert a collapsed row (you can think of it as a <br>) between two flex items two achieve something similar. In a gist:

/* Inserting this collapsed row between two flex items
will make the flex item that comes after it break to a new
row */
.break {
  flex-basis: 100%;
  height: 0;
}`
    },
    {
        id: 3,
        title: 'Set Video Playback Speed with JavaScript',
        category: 'JS',
        date: 'June.29',
        content: `Learn how to control video playback speed using JavaScript's HTMLMediaElement API.

The playbackRate property allows you to speed up or slow down video playback:

const video = document.querySelector('video');

// Double speed
video.playbackRate = 2.0;

// Half speed
video.playbackRate = 0.5;

// Normal speed
video.playbackRate = 1.0;

You can also create interactive controls for users to adjust playback speed dynamically.`
    },
    {
        id: 4,
        title: 'The Ultimate HTML Cheat Sheet For Beginners',
        category: 'HTML',
        date: 'May.9',
        content: `A comprehensive guide to essential HTML elements and attributes for beginners.

HTML (HyperText Markup Language) is the foundation of web development. Here are the most important elements you need to know:

Document Structure:
- <!DOCTYPE html>
- <html>
- <head>
- <body>

Text Elements:
- <h1> to <h6> for headings
- <p> for paragraphs
- <span> for inline text
- <div> for block containers

This cheat sheet covers all the basics you need to start building web pages.`
    },
    {
        id: 5,
        title: 'Advanced CSS Grid Techniques',
        category: 'HTML',
        date: 'May.1',
        content: `Explore advanced CSS Grid techniques for creating complex layouts.

CSS Grid provides powerful tools for creating two-dimensional layouts. Here are some advanced techniques:

Grid Template Areas:
.container {
  display: grid;
  grid-template-areas: 
    "header header header"
    "sidebar main main"
    "footer footer footer";
}

This allows you to create named grid areas for easier layout management.`
    },
    {
        id: 6,
        title: 'Modern JavaScript ES6+ Features',
        category: 'CSS',
        date: 'April.20',
        content: `Discover the most useful ES6+ features that every JavaScript developer should know.

Arrow Functions:
const add = (a, b) => a + b;

Destructuring:
const { name, age } = person;
const [first, second] = array;

Template Literals:
const message = \`Hello, \${name}!\`;

These features make JavaScript code more concise and readable.`
    },
    {
        id: 7,
        title: 'Responsive Design Best Practices',
        category: 'JS',
        date: 'April.12',
        content: `Learn the best practices for creating responsive web designs that work on all devices.

Mobile-First Approach:
Start designing for mobile devices first, then progressively enhance for larger screens.

Flexible Grid Systems:
Use CSS Grid or Flexbox for creating flexible layouts that adapt to different screen sizes.

Media Queries:
@media (min-width: 768px) {
  /* Tablet styles */
}

@media (min-width: 1024px) {
  /* Desktop styles */
}

These techniques ensure your website looks great on all devices.`
    },
    {
        id: 8,
        title: 'JavaScript Performance Optimization',
        category: 'JS',
        date: 'April.9',
        content: `Tips and techniques for optimizing JavaScript performance in web applications.

Debouncing and Throttling:
Use these techniques to limit the frequency of function calls, especially for scroll and resize events.

Lazy Loading:
Load resources only when they're needed to improve initial page load times.

Code Splitting:
Break your JavaScript into smaller chunks that can be loaded on demand.

These optimizations can significantly improve your application's performance.`
    }
];


// Routes
app.get('/', (req, res) => {
    res.render('index', { posts: blogPosts });
});

app.get('/post/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    const post = blogPosts.find(p => p.id === postId);

    if (!post) {
        return res.status(404).render('404');
    }

    res.render('post', { post });
});

// Category filter routes
app.get('/category/:category', (req, res) => {
    const category = req.params.category.toUpperCase();
    const filteredPosts = blogPosts.filter(post => post.category === category);
    res.render('index', { posts: filteredPosts, activeCategory: category });
});


app.get('/post', (req, res) => {
    res.render("add.ejs")
})

app.post('/post', (req, res) => {
    const body = req.body;
    console.log(body);
    const nextID = blogPosts.length + 1
    body['id'] = nextID;
    blogPosts.push(body)
    res.redirect("/")
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});