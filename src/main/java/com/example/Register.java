package com.example;

import java.io.IOException;
import java.io.OutputStream;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.BufferedReader;
import java.net.URL;
import java.net.URLEncoder;
import javax.net.ssl.HttpsURLConnection;
import javax.servlet.*;
import javax.servlet.http.*;

import org.json.JSONObject;

public class Register extends HttpServlet {
    private static final String SECRET_KEY = "6Lf7o2orAAAAAH14GtzHWHlg9sNI9FEaJX1qbS6L";

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // Read form data
        String username = request.getParameter("username");
        String password = request.getParameter("password");
        String gRecaptchaResponse = request.getParameter("g-recaptcha-response");

        // Verify CAPTCHA
        boolean isVerified = verifyRecaptcha(gRecaptchaResponse);

        if (isVerified) {
            // Proceed with registration
            response.getWriter().println("Registration successful for user: " + username);
        } else {
            // CAPTCHA failed
            response.getWriter().println("reCAPTCHA verification failed. Please try again.");
        }
    }

    private boolean verifyRecaptcha(String gRecaptchaResponse) throws IOException {
        String verifyUrl = "https://www.google.com/recaptcha/api/siteverify";
        String postData = "secret=" + URLEncoder.encode(SECRET_KEY, "UTF-8") +
                          "&response=" + URLEncoder.encode(gRecaptchaResponse, "UTF-8");

        URL url = new URL(verifyUrl);
        HttpsURLConnection conn = (HttpsURLConnection) url.openConnection();

        conn.setRequestMethod("POST");
        conn.setDoOutput(true);
        OutputStream out = conn.getOutputStream();
        out.write(postData.getBytes());
        out.flush();
        out.close();

        // Read response
        InputStream in = conn.getInputStream();
        BufferedReader reader = new BufferedReader(new InputStreamReader(in));
        String inputLine;
        StringBuilder responseStr = new StringBuilder();

        while ((inputLine = reader.readLine()) != null) {
            responseStr.append(inputLine);
        }
        reader.close();

        // Parse JSON
        JSONObject json = new JSONObject(responseStr.toString());
        return json.getBoolean("success");
    }
}
