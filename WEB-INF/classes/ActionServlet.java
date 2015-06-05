import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class ActionServlet extends HttpServlet {

    private static final long serialVersionUID = 1L;

    @Override
    public void doGet(HttpServletRequest request,
                      HttpServletResponse response)
        throws IOException, ServletException
    {
	System.out.println("get");
    	String uri = request.getRequestURI();
    	System.out.println("uri="+uri);
    	String url = "json"+uri.substring(4, uri.lastIndexOf("psp"))+"json";
    	
    	response.sendRedirect(url);
    }

    @Override
    public void doPost(HttpServletRequest request,
                      HttpServletResponse response)
        throws IOException, ServletException
    {
	System.out.println("post");
    	doGet(request, response);
    }

    @Override
    public void doPut(HttpServletRequest request,
                      HttpServletResponse response)
        throws IOException, ServletException
    {
	System.out.println("put");
    	doGet(request, response);
    }

    @Override
    public void doDelete(HttpServletRequest request,
                      HttpServletResponse response)
        throws IOException, ServletException
    {
	System.out.println("delete");
    	doGet(request, response);
    }
}



