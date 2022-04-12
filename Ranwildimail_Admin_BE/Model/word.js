class WordModel {
    constructor(Language_Id, Word, Word_Des_Id, Word_Id, Word_Status){
        this.Language_Id = Language_Id;
        this.Word = Word;
        this.Word_Des_Id = Word_Des_Id;
        this.Word_Id = Word_Id;
        this.Word_Status = Word_Status;
    }
}
module.exports = WordModel;