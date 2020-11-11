import mongoose from 'mongoose';

class database{
  database: string;
  url: string;
  private mongoose = mongoose;
  constructor(url:string,database:string) {
    this.database = database;
    this.url = url;
    
  }
  async connect() {
    await this.mongoose.connect(this.url + '/' + this.database, {
      useNewUrlParser: true,
      useUnifiedTopology:true,
      useCreateIndex:true
    }
    )
    console.log('Database is connected');
  }
  
}
const databaseModule = new database('mongodb://localhost', 'cnetwork');

export default databaseModule;