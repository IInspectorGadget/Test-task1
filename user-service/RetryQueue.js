import axios from 'axios';
import fs from 'fs';


class RetryQueue {
  constructor() {
    this.queue = [];
    this.processing = false;
    this.filePath = 'queue.json';
    this.loadQueueFromFile();
    this.factor = 2;
    this.time = 500;
    this.attempt = 1;
    this.maxTime = 10000;
  }

  addToQueue(data) {
    this.queue.push(data);
    this.startProcessing();
  }

  async startProcessing() {
    if (!this.processing) {
      this.processing = true;
      await this.processQueue();
      this.processing = false;
    }
  }

  async processQueue() {
    while (this.queue.length > 0) {
      const data = this.queue[0];
      try {
        await axios.post('http://localhost:3001/api/userLogs', data);
        console.log('Data sent successfully:', data);
        this.queue.shift();
      } catch (error) {
        this.attempt++;
        console.error(`Attempt ${this.attempt}: Failed to connect to the second server:`, error.message);

        const temp = this.time * this.factor
        if ( temp <= this.maxTime){
          this.time = temp
        }

        await new Promise(resolve => setTimeout(resolve, this.time));
      }
    }
  }

  loadQueueFromFile() {
    if (fs.existsSync(this.filePath)) {
      try {
        const fileData = fs.readFileSync(this.filePath, 'utf8');
        if (fileData) {
          this.queue = JSON.parse(fileData);
          this.startProcessing();
          fs.unlinkSync(this.filePath);
        }
      } catch (error) {
        console.error('Error reading queue file:', error.message);
        this.queue = [];
      }
    }
  }

  saveQueueToFile() {
    fs.writeFileSync(this.filePath, JSON.stringify(this.queue));
  }

}

export default RetryQueue;