import ProductCard from "../Components/Card/ProjectCard";

const products = [
  {
    name: "Gaming Headset",
    image: "https://thumbs.dreamstime.com/b/lonely-elephant-against-sunset-beautiful-sun-clouds-savannah-serengeti-national-park-africa-tanzania-artistic-imag-image-106950644.jpg",
    category: "Electronics",
    categoryColor: "bg-blue-500",
    tags: ["Wireless", "Noise-Canceling"],
    price: 89.99,
  },
  {
    name: "Mechanical Keyboard dainsooooooooooooooooooooooooooood asd iasd asidasidasd indasndnas dasjndilasdnasd sa id sadin",
    image: "https://media.istockphoto.com/id/1403859199/photo/typical-huts-in-brana-mumian-somiedo-natural-park-asturias-spain.jpg?s=612x612&w=0&k=20&c=99N6RiIb4eQuyxqmTfiTAyxQrby6bo1xqLdJl4nvdXI=",
    category: "Accessories",
    categoryColor: "bg-green-500",
    tags: ["RGB", "Mechanical", ],
    price: 129.99,
  },
  {
    name: "Gaming Headset",
    image: "https://thumbs.dreamstime.com/b/lonely-elephant-against-sunset-beautiful-sun-clouds-savannah-serengeti-national-park-africa-tanzania-artistic-imag-image-106950644.jpg",
    category: "Electronics",
    categoryColor: "bg-blue-500",
    tags: ["Wireless", "Noise-Canceling"],
    price: 89.99,
  },
  {
    name: "Mechanical Keyboard",
    image: "https://media.istockphoto.com/id/1403859199/photo/typical-huts-in-brana-mumian-somiedo-natural-park-asturias-spain.jpg?s=612x612&w=0&k=20&c=99N6RiIb4eQuyxqmTfiTAyxQrby6bo1xqLdJl4nvdXI=",
    category: "Accessories",
    categoryColor: "bg-green-500",
    tags: ["RGB", "Mechanical"],
    price: 129.99,
  },
  {
    name: "Gaming Headset",
    image: "https://thumbs.dreamstime.com/b/lonely-elephant-against-sunset-beautiful-sun-clouds-savannah-serengeti-national-park-africa-tanzania-artistic-imag-image-106950644.jpg",
    category: "Electronics",
    categoryColor: "bg-blue-500",
    tags: ["Wireless", "Noise-Canceling"],
    price: 89.99,
  },
  {
    name: "Mechanical Keyboard",
    image: "https://media.istockphoto.com/id/1403859199/photo/typical-huts-in-brana-mumian-somiedo-natural-park-asturias-spain.jpg?s=612x612&w=0&k=20&c=99N6RiIb4eQuyxqmTfiTAyxQrby6bo1xqLdJl4nvdXI=",
    category: "Accessories",
    categoryColor: "bg-green-500",
    tags: ["RGB", "Mechanical"],
    price: 129.99,
  },
  {
    name: "Gaming Headset",
    image: "https://thumbs.dreamstime.com/b/lonely-elephant-against-sunset-beautiful-sun-clouds-savannah-serengeti-national-park-africa-tanzania-artistic-imag-image-106950644.jpg",
    category: "Electronics",
    categoryColor: "bg-blue-500",
    tags: ["Wireless", "Noise-Canceling"],
    price: 89.99,
  },
  {
    name: "Mechanical Keyboard",
    image: "https://media.istockphoto.com/id/1403859199/photo/typical-huts-in-brana-mumian-somiedo-natural-park-asturias-spain.jpg?s=612x612&w=0&k=20&c=99N6RiIb4eQuyxqmTfiTAyxQrby6bo1xqLdJl4nvdXI=",
    category: "Accessories",
    categoryColor: "bg-green-500",
    tags: ["RGB", "Mechanical"],
    price: 129.99,
  },
  {
    name: "Gaming Headset",
    image: "https://thumbs.dreamstime.com/b/lonely-elephant-against-sunset-beautiful-sun-clouds-savannah-serengeti-national-park-africa-tanzania-artistic-imag-image-106950644.jpg",
    category: "Electronics",
    categoryColor: "bg-blue-500",
    tags: ["Wireless", "Noise-Canceling"],
    price: 89.99,
  },
  {
    name: "Mechanical Keyboard",
    image: "https://media.istockphoto.com/id/1403859199/photo/typical-huts-in-brana-mumian-somiedo-natural-park-asturias-spain.jpg?s=612x612&w=0&k=20&c=99N6RiIb4eQuyxqmTfiTAyxQrby6bo1xqLdJl4nvdXI=",
    category: "Accessories",
    categoryColor: "bg-green-500",
    tags: ["RGB", "Mechanical"],
    price: 129.99,
  },
  {
    name: "Gaming Headset",
    image: "https://thumbs.dreamstime.com/b/lonely-elephant-against-sunset-beautiful-sun-clouds-savannah-serengeti-national-park-africa-tanzania-artistic-imag-image-106950644.jpg",
    category: "Electronics",
    categoryColor: "bg-blue-500",
    tags: ["Wireless", "Noise-Canceling"],
    price: 89.99,
  },
  {
    name: "Mechanical Keyboard",
    image: "https://media.istockphoto.com/id/1403859199/photo/typical-huts-in-brana-mumian-somiedo-natural-park-asturias-spain.jpg?s=612x612&w=0&k=20&c=99N6RiIb4eQuyxqmTfiTAyxQrby6bo1xqLdJl4nvdXI=",
    category: "Accessories",
    categoryColor: "bg-green-500",
    tags: ["RGB", "Mechanical"],
    price: 129.99,
  },
  {
    name: "Gaming Headset",
    image: "https://thumbs.dreamstime.com/b/lonely-elephant-against-sunset-beautiful-sun-clouds-savannah-serengeti-national-park-africa-tanzania-artistic-imag-image-106950644.jpg",
    category: "Electronics",
    categoryColor: "bg-blue-500",
    tags: ["Wireless", "Noise-Canceling"],
    price: 89.99,
  },
  {
    name: "Mechanical Keyboard",
    image: "https://media.istockphoto.com/id/1403859199/photo/typical-huts-in-brana-mumian-somiedo-natural-park-asturias-spain.jpg?s=612x612&w=0&k=20&c=99N6RiIb4eQuyxqmTfiTAyxQrby6bo1xqLdJl4nvdXI=",
    category: "Accessories",
    categoryColor: "bg-green-500",
    tags: ["RGB", "Mechanical"],
    price: 129.99,
  },
  {
    name: "Gaming Headset",
    image: "https://thumbs.dreamstime.com/b/lonely-elephant-against-sunset-beautiful-sun-clouds-savannah-serengeti-national-park-africa-tanzania-artistic-imag-image-106950644.jpg",
    category: "Electronics",
    categoryColor: "bg-blue-500",
    tags: ["Wireless", "Noise-Canceling"],
    price: 89.99,
  },
  {
    name: "Mechanical Keyboard",
    image: "https://media.istockphoto.com/id/1403859199/photo/typical-huts-in-brana-mumian-somiedo-natural-park-asturias-spain.jpg?s=612x612&w=0&k=20&c=99N6RiIb4eQuyxqmTfiTAyxQrby6bo1xqLdJl4nvdXI=",
    category: "Accessories",
    categoryColor: "bg-green-500",
    tags: ["RGB", "Mechanical"],
    price: 129.99,
  },
  {
    name: "Gaming Headset",
    image: "https://thumbs.dreamstime.com/b/lonely-elephant-against-sunset-beautiful-sun-clouds-savannah-serengeti-national-park-africa-tanzania-artistic-imag-image-106950644.jpg",
    category: "Electronics",
    categoryColor: "bg-blue-500",
    tags: ["Wireless", "Noise-Canceling"],
    price: 89.99,
  },
  {
    name: "Mechanical Keyboard",
    image: "https://media.istockphoto.com/id/1403859199/photo/typical-huts-in-brana-mumian-somiedo-natural-park-asturias-spain.jpg?s=612x612&w=0&k=20&c=99N6RiIb4eQuyxqmTfiTAyxQrby6bo1xqLdJl4nvdXI=",
    category: "Accessories",
    categoryColor: "bg-green-500",
    tags: ["RGB", "Mechanical"],
    price: 129.99,
  },
  {
    name: "Gaming Headset",
    image: "https://thumbs.dreamstime.com/b/lonely-elephant-against-sunset-beautiful-sun-clouds-savannah-serengeti-national-park-africa-tanzania-artistic-imag-image-106950644.jpg",
    category: "Electronics",
    categoryColor: "bg-blue-500",
    tags: ["Wireless", "Noise-Canceling"],
    price: 89.99,
  },
  {
    name: "Mechanical Keyboard",
    image: "https://media.istockphoto.com/id/1403859199/photo/typical-huts-in-brana-mumian-somiedo-natural-park-asturias-spain.jpg?s=612x612&w=0&k=20&c=99N6RiIb4eQuyxqmTfiTAyxQrby6bo1xqLdJl4nvdXI=",
    category: "Accessories",
    categoryColor: "bg-green-500",
    tags: ["RGB", "Mechanical"],
    price: 129.99,
  },
  {
    name: "Gaming Headset",
    image: "https://thumbs.dreamstime.com/b/lonely-elephant-against-sunset-beautiful-sun-clouds-savannah-serengeti-national-park-africa-tanzania-artistic-imag-image-106950644.jpg",
    category: "Electronics",
    categoryColor: "bg-blue-500",
    tags: ["Wireless", "Noise-Canceling"],
    price: 89.99,
  },
  {
    name: "Mechanical Keyboard",
    image: "https://media.istockphoto.com/id/1403859199/photo/typical-huts-in-brana-mumian-somiedo-natural-park-asturias-spain.jpg?s=612x612&w=0&k=20&c=99N6RiIb4eQuyxqmTfiTAyxQrby6bo1xqLdJl4nvdXI=",
    category: "Accessories",
    categoryColor: "bg-green-500",
    tags: ["RGB", "Mechanical"],
    price: 129.99,
  },
  {
    name: "Gaming Headset",
    image: "https://thumbs.dreamstime.com/b/lonely-elephant-against-sunset-beautiful-sun-clouds-savannah-serengeti-national-park-africa-tanzania-artistic-imag-image-106950644.jpg",
    category: "Electronics",
    categoryColor: "bg-blue-500",
    tags: ["Wireless", "Noise-Canceling"],
    price: 89.99,
  },
  {
    name: "Mechanical Keyboard",
    image: "https://media.istockphoto.com/id/1403859199/photo/typical-huts-in-brana-mumian-somiedo-natural-park-asturias-spain.jpg?s=612x612&w=0&k=20&c=99N6RiIb4eQuyxqmTfiTAyxQrby6bo1xqLdJl4nvdXI=",
    category: "Accessories",
    categoryColor: "bg-green-500",
    tags: ["RGB", "Mechanical"],
    price: 129.99,
  },
 
];

const Page = () => {
  return (
    <div className="mt-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Page;
