const Books = require('../Models/Book');
const cloudinary = require("cloudinary").v2;

async function addBook(req,res){

    // console.log("Reciver form data :" , req.body);
    // console.log(req.file,'req.file');//log the form data
    // res.end("<h1>Uploading in proces....</h1>");
    
    try {
        let book = new Books(req.body);

        if(req.file){
        cloudinary.config({ 
            cloud_name: 'drnasr3fr', 
            api_key: '319587929784511', 
            api_secret: 'kJPsNAfEqdElISAFUW4jk9vmJ4Y' 
        });
        const result = await cloudinary.uploader.upload(req.file.path);
        console.log(result.secure_url,'upload.secure_url');
        console.log(req.file,'req.file');
        book.bookImage = result.secure_url;
    }
        book.isbn =  book._id;
        await book.save();
        let books = await Books.find({}); 
            res.render('bookList',{
                books:books
            })  
        
    } 
    catch (error) {
        console.log(error);
        
    }
    

    // try {
    //     console.log(req.body);
    //     let Book = new Books(req.body);
    //     Book.isbn = await Book._id;
    //     await Book.save();
    //     let books = await Books.find({});
    //     res.render('bookList',{
    //         books:books
    //     })  
    // } catch (err) {
    //     console.log(err);
        
    // }
}
async function getBooks(req,res) {
    try {
        let books = await Books.find({});  
        res.render('bookList.ejs',({
            books:books
        }))
    } catch (err) {
        console.log(err);
        
    }
}
async function deleteBook(req,res) {
    try {
        let id = req.params.id;
        await Books.deleteOne({_id : id});
        let books = await Books.find({});  
        res.render('bookList.ejs',({
            books:books
        }))
    } catch (err) {
        console.log(err);
        
    }
}
async function getBookForEdit(req,res) {
    try {
        let id = req.params.id;
        let book = await Books.findOne({_id:id});
        if(book){
            res.render('UpdateBook',{
                book:book
            })
        }
    } catch (err) {
        console.log(err);
        
    }
}
async function updateBook(req,res) {
    let id = req.params.id;
    let book = await Books.findOne({_id:id});
    book.bookTitle = req.body.bookTitle;
    book.publisher = req.body.publisher;
    book.price = req.body.price;
    book.language = req.body.language;
    book.edition = req.body.edition;
    book.noOfPages = req.body.noOfPages;
    book.country = req.body.country;
    await book.save();
    books = await Books.find({});
    res.render('bookList',{
        books : books
    })

}
async function getBookForUser(req,res) {
    try {
        let books = await Books.find({});  
        res.render('BookListForUser.ejs',({
            books:books
        }))
    } catch (err) {
        console.log(err);
        
    }
}
module.exports={
    addBook,
    getBooks,
    deleteBook,
    getBookForEdit,
    updateBook,
    getBookForUser
}