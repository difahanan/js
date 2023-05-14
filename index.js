const express = require('express');
const Database = require('./db')
const { ObjectId } = require('mongodb')
let posts = require('./db/post.json');
const app = express();

app.use(express.urlencoded({ extended: false }))

// initiate database 
const database = new Database()

app.use(function(req, res, next){
    const date = new Date()
    console.log(req.url);
    console.log('Time:', date.toUTCString())
    next();
})

// === API untuk read postingan 
app.get('/api/v1/posts/:id', async function (req, res) {
    try {
        console.log('isi params:', req.params)
        const db = database.db;
        const data = await db.findOne({_id: ObjectId(req.params.id)});
        console.log(data);
        if(data !== undefined) {
            res.status(200).json({ status: 'success', data: data });
        } else {
            res.status(404).json({ status: 'failed', error: 'Data Not Found !'});
        }
} catch (error) {
    console.log(error)
    res.status(500).json({ status: 'failed', error: 'Internal server error !'});
}
})

// == API untuk create postingan 
app.post('/api/v1/posts/insert', async function (req,res) {
    // 1. Ambil data client di request body 
    const { title, body } = req.body ;
    // 2. Buat id baru untuk data tsb
    const id = posts.length + 1;
    // 3. Masukkan data baru ke "database"
    const db = database.db;
    const data = await db.insertOne({ title, body });
    // 4. Kirim response perubahan data
    res.json({ _id: data.insertedId, title, body });
})
// == API untuk update postingan
app.put('/api/v1/posts/update/:id', async function (req, res) {
    // 1. kita susun terlebih dahulu data baru yang mau kita ubah 
    const data = req.body;
    // 2. kita cari data yang mau diubah, jika id-nya sesuai dengan id params
    // kita update datanya 
    const db = database.db;
    await db.updateOne({_id: ObjectId(req.params.id) }, { $set: data });
    // posts = posts.map(function(value) {
    //     if(value.id == req.params.id) {
    //         console.log('object 1:', value);
    //         console.log('object 2:', data);
    //         console.log('Gabungan object variasi 1', { ...value, ...data });
    //         console.log('Gabungan object variasi 2', { ...data, ...value });
    //         // SELECT * FROM customer WHERE nama = 'Rudi'
    //         // INSERT INTO customer (id, nama) VALUES (2, 'Rudi')
    //         // UPDATE customer SET nama = 'Rudi WHERE id = 1
    //     }
    //     newData = { ...value, ...data }
    //     return value.id == req.params.id ? newData : value  
    // })
    // 3. Kasih Response
    const value = await db.findOne({_id: ObjectId(req.params.id)});
    res.status(200).json(value)
});
// == API untuk delete
app.delete('/api/v1/posts/delete/:id', async function (req, res) {
    posts = posts.filter(function (value) {
        return req.params.id != value.id
    });
    const db = database.db;
    await db.deleteOne({_id: ObjectId(req.params.id)});
    const value = await db.find({}).toArray();
    console.log(value)
    res.status(200).json({ data: value});
})

app.use(function(error, req, res, next){
    console.log(error);
    res.status(500).json({ status: 'failed', error: 'Internal server error !' })
})

const port = 3000
app.listen(port, function(){
    console.log(`Server berjalan di port ${port}!`)
})