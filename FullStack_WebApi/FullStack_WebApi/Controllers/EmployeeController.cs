using FullStack_WebApi.Models;
using System;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Net;
using System.Net.Http;
using System.Web.Http;


namespace FullStack_WebApi.Controllers
{
    public class EmployeeController : ApiController
    {
        public HttpResponseMessage Get()
        {
            DataTable table = new DataTable();

            string query = @"select EmployeeID, EmployeeName, Department, EmailID, 
                            convert(varchar(10), DateOfJoin, 120) as DateOfJoin 
                            from dbo.Employees";

            using (var connection = new SqlConnection(ConfigurationManager.ConnectionStrings["EmployeeAppDB"].ConnectionString))
            using (var cmd = new SqlCommand(query, connection))
            using (var dataAdapter = new SqlDataAdapter(cmd))
            {
                cmd.CommandType = CommandType.Text;
                dataAdapter.Fill(table);
            }

            return Request.CreateResponse(HttpStatusCode.OK, table);
        }

        public string Post(Employee employee)
        {
            try
            {
                DataTable table = new DataTable();

                string query = @"insert into dbo.Employees (EmployeeName, Department, EmailID, DateOfJoin)
                                values ('" + employee.EmployeeName + @"'
                                        ,'" + employee.Department + @"'
                                        ,'" + employee.EmailID + @"'
                                        ,'" + employee.DateOfJoin + @"')  ";

                using (var connection = new SqlConnection(ConfigurationManager.ConnectionStrings["EmployeeAppDB"].ConnectionString))
                using (var cmd = new SqlCommand(query, connection))
                using (var dataAdapter = new SqlDataAdapter(cmd))
                {
                    cmd.CommandType = CommandType.Text;
                    dataAdapter.Fill(table);
                }

                return "Added Successfully";
            }
            catch (Exception ex)
            {
                return "Failed to Add";
            }
        }

        public string Put(Employee employee)
        {
            try
            {
                DataTable table = new DataTable();

                string query = @"update dbo.Employees set
                                EmployeeName = '" + employee.EmployeeName + @"'
                                ,Department = '" + employee.Department + @"'
                                ,EmailID = '" + employee.EmailID + @"'
                                ,DateOfJoin = '" + employee.DateOfJoin + @"'
                                where EmployeeID = " + employee.EmployeeID + @"";

                using (var connection = new SqlConnection(ConfigurationManager.ConnectionStrings["EmployeeAppDB"].ConnectionString))
                using (var cmd = new SqlCommand(query, connection))
                using (var dataAdapter = new SqlDataAdapter(cmd))
                {
                    cmd.CommandType = CommandType.Text;
                    dataAdapter.Fill(table);
                }

                return "Updateed Successfully";
            }
            catch (Exception)
            {
                return "Failed to Updated";
            }
        }

        public string DeleteMetod(int id)
        {
            try
            {
                DataTable table = new DataTable();

                string query = @"delete from dbo.Employees where EmployeeID = " + id;

                using (var connection = new SqlConnection(ConfigurationManager.ConnectionStrings["EmployeeAppDB"].ConnectionString))
                using (var cmd = new SqlCommand(query, connection))
                using (var dataAdapter = new SqlDataAdapter(cmd))
                {
                    cmd.CommandType = CommandType.Text;
                    dataAdapter.Fill(table);
                }

                return "Deleted Successfully";
            }
            catch (Exception)
            {
                return "Failed to delete";
            }
        }



    }
}
