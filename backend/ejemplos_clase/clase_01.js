import { peliculas } from "./movies.js";
import fs from "fs";
import readline from "readline";
import { config } from "dotenv";

config()

console.log(process.env.PORT )

console.table(peliculas);

const rl = readline.createInterface({
   input: process.stdin,
   output: process.stdout
})


rl.question("cual es tu nombre? ", (name)=>{
    console.log(`hola ${name}`)
    rl.close()
})

const original =fs.readFileSync("archivo.txt", "utf-8")

fs.writeFileSync("archivo-copy.txt", original)

let copy = fs.readFileSync("archivo-copy.txt", "utf-8")

copy = copy.replace(/esto es un texto/ig, "aprendiendo node")


fs.writeFileSync("archivo-copy.txt", copy)

