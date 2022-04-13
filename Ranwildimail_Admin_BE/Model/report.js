class ReportModel {
    constructor(Actual_Word_Id, Day_Report, Expected_Word_Id, Note, Report_Id, Report_Image, Status){
        this.Actual_Word_Id = Actual_Word_Id;
        this.Day_Report = Day_Report;
        this.Expected_Word_Id = Expected_Word_Id;
        this.Note = Note;
        this.Report_Id = Report_Id;
        this.Report_Image = Report_Image;
        this.Status = Status;
    }
}
module.exports = ReportModel;