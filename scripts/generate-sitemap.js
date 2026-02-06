const { SitemapStream, streamToPromise } = require('sitemap');
const { createWriteStream } = require('fs');

const pages = [
  '/',             
  '/about',
  '/blogs',
  '/contact',
  '/services',
];

// sitemap stream'ini oluştur
const sitemap = new SitemapStream({ hostname: 'https://xn--lcanzeleitim-7ib29ceib.com' });
// public/sitemap.xml dosyasına yazmak için stream oluştur
const writeStream = createWriteStream('./public/sitemap.xml');

// 👉 writeStream'e bağla!
sitemap.pipe(writeStream);

// URL'leri yaz
pages.forEach(page => {
  sitemap.write({ url: page, changefreq: 'monthly', priority: 0.8 });
});

// yazma işlemini bitir
sitemap.end();

// tamamlandığında bilgi ver
streamToPromise(sitemap)
  .then(() => console.log('✅ sitemap.xml başarıyla oluşturuldu.'))
  .catch(console.error);
