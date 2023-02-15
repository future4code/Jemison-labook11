import { BaseDatabase } from '../baseDatabase';
import { TABLE_USERS, TABLE_POSTS, TABLE_FRIENDSHIPS, TABLE_COMMENTS, TABLE_LIKES } from '../tableNames';
import users from './users.json'
import posts from './posts.json'
import friendships from './friendships.json'
import likes from './likes.json'
import comments from './comments.json'


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
               user_sender_fk VARCHAR(255),
               user_reciever_fk VARCHAR(255),
               FOREIGN KEY (user_sender_fk) REFERENCES ${TABLE_USERS}(id),
               FOREIGN KEY (user_reciever_fk) REFERENCES ${TABLE_USERS}(id),
               PRIMARY KEY(user_sender_fk,user_reciever_fk)
            );
            
            CREATE TABLE IF NOT EXISTS ${TABLE_POSTS}(
               id VARCHAR(255) PRIMARY KEY,
               photo VARCHAR(255) NOT NULL,
               description VARCHAR(255) NOT NULL,
               type ENUM("normal","event") DEFAULT "normal",
               created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
               author_id_fk VARCHAR(255),
               FOREIGN KEY (author_id_fk) REFERENCES ${TABLE_USERS}(id)
            );   

            CREATE TABLE IF NOT EXISTS ${TABLE_LIKES}(
               user_id_fk  VARCHAR(255),
               post_id_fk VARCHAR(255),
               FOREIGN KEY (user_id_fk) REFERENCES ${TABLE_USERS}(id),
               FOREIGN KEY (post_id_fk) REFERENCES ${TABLE_POSTS}(id),
               PRIMARY KEY(user_id_fk,post_id_fk)
            );

            CREATE TABLE IF NOT EXISTS ${TABLE_COMMENTS}(
               id VARCHAR (255) PRIMARY KEY,
               user_id_fk  VARCHAR(255),
               post_id_fk VARCHAR(255),
               comment VARCHAR(8000),
               commented_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
               FOREIGN KEY (user_id_fk) REFERENCES ${TABLE_USERS}(id),
               FOREIGN KEY (post_id_fk) REFERENCES ${TABLE_POSTS}(id) 
            );         
         `)
            .then(() => {
               console.log(`Tables created successfully!`)
               insertData()
            })
            .catch((error: any) => console.log(error.sqlMessage || error.message))
      }

      const insertData = async () => {
         try {
            await MigrationDataBase.connection(`${TABLE_USERS}`)
               .insert(users)
               .then(() => console.log(`${TABLE_USERS} populated!`))
               .catch((error: any) => printError(error))

            await MigrationDataBase.connection(`${TABLE_FRIENDSHIPS}`)
               .insert(friendships)
               .then(() => console.log(`${TABLE_FRIENDSHIPS} populated!`))
               .catch((error: any) => printError(error))


            await MigrationDataBase.connection(`${TABLE_POSTS}`)
               .insert(posts)
               .then(() => console.log(`${TABLE_POSTS} populated!`))
               .catch((error: any) => printError(error))

            await MigrationDataBase.connection(`${TABLE_LIKES}`)
               .insert(likes)
               .then(() => console.log(`${TABLE_LIKES} populated!`))
               .catch((error: any) => printError(error))

            await MigrationDataBase.connection(`${TABLE_COMMENTS}`)
               .insert(comments)
               .then(() => console.log(`${TABLE_COMMENTS} populated!`))
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
