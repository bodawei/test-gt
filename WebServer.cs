using System;
using System.Net;
using System.Text;

class WebServer
{
    static void Main(string[] args)
    {
        string prefix = "http://*:8080/";
        HttpListener listener = new HttpListener();
        listener.Prefixes.Add(prefix);
        listener.Start();

        Console.WriteLine("Listening on port 8080...");

        while (true)
        {
            HttpListenerContext context = listener.GetContext();
            HttpListenerRequest request = context.Request;
            HttpListenerResponse response = context.Response;

            string responseBody = "Hello, World!";
            byte[] buffer = Encoding.UTF8.GetBytes(responseBody);

            response.ContentType = "text/plain";
            response.ContentLength64 = buffer.Length;
            response.StatusCode = 200;

            System.IO.Stream output = response.OutputStream;
            output.Write(buffer, 0, buffer.Length);
            output.Close();

            Console.WriteLine("{0} {1}", request.HttpMethod, request.Url);
        }
    }
}
