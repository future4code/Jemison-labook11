import { BaseDatabase } from "../baseDatabase"
import { TABLE_USERS, TABLE_POSTS, TABLE_FRIENDSHIPS, TABLE_COMMENTS, TABLE_LIKES } from './tableNames';
import users from './users.json'
import posts from './posts.json'

export abstract class MigrationDataBase extends BaseDatabase {

   public static startMigration() {

      const createTables = async () => {
         await MigrationDataBase.connection.raw(`
              SET FOREIGN_KEY_CHECKS= 0;

               DROP TABLE IF EXISTS ${TABLE_USERS}, ${TABLE_POSTS}, ${TABLE_FRIENDSHIPS}, ${TABLE_LIKES}, ${TABLE_COMMENTS};

            SET FOREIGN_KEY_CHECKS= 1;
   
            CREATE TABLE IF NOT EXISTS ${TABLE_USERS}(
               id VARCHAR(255) PRIMARY KEY,
               name VARCHAR(255) NOT NULL,
               email VARCHAR(255) UNIQUE NOT NULL,
               password VARCHAR(255) NOT NULL
            );

            CREATE TABLE IF NOT EXISTS ${TABLE_FRIENDSHIPS}(

            );
            
            CREATE TABLE IF NOT EXISTS ${TABLE_POSTS}(
               id VARCHAR(255) PRIMARY KEY,
               photo VARCHAR(255) NOT NULL,
               description VARCHAR(255) NOT NULL,
               type ENUM("normal","event") DEFAULT "normal",
               created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
               author_id VARCHAR(255),
               FOREIGN KEY (author_id) REFERENCES labook_users (id)
            );   

            CREATE TABLE IF NOT EXISTS ${TABLE_LIKES}(

            );

            CREATE TABLE IF NOT EXISTS ${TABLE_COMMENTS}(
  
            )         
         `)
            .then(() => {
               console.log(`Tables created successfully!`)
            })
            .catch((error: any) => console.log(error.sqlMessage || error.message))
      }
      const insertData = async () => {
         try {
            await MigrationDataBase.connection(`${TABLE_USERS}`)
               .insert(users)
               .then(() => console.log(`${TABLE_USERS} populated!`))
               .catch((error: any) => printError(error))

            await MigrationDataBase.connection(`${TABLE_POSTS}`)
               .insert(posts)
               .then(() => console.log(`${TABLE_POSTS} populated!`))
               .catch((error: any) => printError(error))
         } catch (error: any) {
            console.log(error.sqlMessage || error.message)
         } finally {
            console.log("Ending connection!")

            return MigrationDataBase.connection.destroy()
         }
      }

      const printError = (error: any) => {
         console.log(error.sqlMessage || error.message)
      }

      createTables()

   }
}

MigrationDataBase.startMigration()
