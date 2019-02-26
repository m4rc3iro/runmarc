export class Comment {

  private id: number;
  public date: Date;
  public author: string;
  public email: string;
  public text: string;
  public likes: number;

  constructor (date: Date, author: string, email: string, text: string, likes: number) {
    this.date = date;
    this.author = author;
    this.email = email;
    this.text = text;
    this.likes = likes;
  }

}
