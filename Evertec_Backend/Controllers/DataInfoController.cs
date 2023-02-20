using Evertec_Backend.Models;
using Evertec_Backend.Models.Request;
using Evertec_Backend.Models.Response;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Evertec_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DataInfoController : ControllerBase
    {
        //Métodos para Crear, Leer, Actualizar y Eliminar de la tabla DataInfo

        readonly DataResponse res = new();

        [HttpPost]
        public IActionResult Create(DataInfoRequest model)
        {
            try
            {
                using (EvertecCTX db = new())
                {
                    DataInfo dataInfo = new();
                    dataInfo.Id = model.Id;
                    dataInfo.Name = model.Name;
                    dataInfo.LastName = model.LastName;
                    dataInfo.BirthDay = model.BirthDay;
                    dataInfo.UserPhoto = model.UserPhoto;
                    dataInfo.MaritalStatus = model.MaritalStatus;
                    dataInfo.HasSiblings = model.HasSiblings;
                    db.DataInfos.Add(dataInfo);
                    db.SaveChanges();

                    res.Success = true;
                    res.Message = "✓ Guardado Correcto";
                }
            }
            catch (Exception e)
            {
                res.Message = "⚠ Exepcion: " + e.Message;
            }
            return Ok(res);
        }

        [HttpGet]
        public IActionResult Read()
        {
            try
            {
                using (EvertecCTX db = new())
                {
                    res.Data = db.DataInfos.OrderByDescending(d => d.Id).ToList();
                    res.Success = true;
                    res.Message = "✓ Consulta Correcta";
                }

            }
            catch (Exception e)
            {
                res.Message = "⚠ Exepcion: " + e.Message;
            }
            return Ok(res);
        }

        [HttpPut]
        public IActionResult Update(DataInfoRequest model)
        {
            try
            {
                using (EvertecCTX db = new())
                {
                    DataInfo dataInfo = db.DataInfos.Find(model.Id) ?? new();
                    dataInfo.Id = model.Id;
                    dataInfo.Name = model.Name;
                    dataInfo.LastName = model.LastName;
                    dataInfo.BirthDay = model.BirthDay;
                    dataInfo.UserPhoto = model.UserPhoto;
                    dataInfo.MaritalStatus = model.MaritalStatus;
                    dataInfo.HasSiblings = model.HasSiblings;
                    db.Entry(dataInfo).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                    db.SaveChanges();

                    res.Success = true;
                    res.Message = "✓ Actualizado Correcto";
                }

            }
            catch (Exception e)
            {
                res.Message = "⚠ Exepcion: " + e.Message;
            }
            return Ok(res);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                using (EvertecCTX db = new())
                {
                    DataInfo dataInfo = db.DataInfos.Find(id) ?? new();
                    db.DataInfos.Remove(dataInfo);
                    db.SaveChanges();

                    res.Success = true;
                    res.Message = "✓ Borrado Correcto";
                }

            }
            catch (Exception e)
            {
                res.Message = "⚠ Exepcion: " + e.Message;
            }
            return Ok(res);
        }
    }
}
