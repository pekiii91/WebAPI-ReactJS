using System;

namespace FullStack_WebApi.Models
{
    public class Employee
    {
        public long EmployeeID { get; set; }
        public string EmployeeName { get; set; }
        public string Department { get; set; }
        public string EmailID { get; set; }
        public DateTime? DateOfJoin { get; set; }

    }
}