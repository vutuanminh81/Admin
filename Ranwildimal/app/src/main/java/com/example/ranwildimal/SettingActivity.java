package com.example.ranwildimal;

import androidx.appcompat.app.ActionBar;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.res.Configuration;
import android.graphics.Typeface;
import android.os.Build;
import android.os.Bundle;
import android.os.Environment;
import android.view.Gravity;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Spinner;
import android.widget.TextView;

import com.google.android.material.navigation.NavigationBarView;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Locale;

public class SettingActivity extends AppCompatActivity {
    public String FILE_PATH = "";
    String filepath = "MyFileDir";
    public static final String ID_FILE = "locale.txt";
    private String data = "";
    Toolbar setting_toolbar;
    Context context;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        //Check set locale for activity
        if(this.getSharedPreferences("Setting",MODE_PRIVATE).getString("My_Lang","").equalsIgnoreCase("en")){
            setLocale("en");
        }else if(this.getSharedPreferences("Setting",MODE_PRIVATE).getString("My_Lang","").equalsIgnoreCase("vi")){
            setLocale("vi");
        }else if(this.getSharedPreferences("Setting",MODE_PRIVATE).getString("My_Lang","").equalsIgnoreCase("ja")){
            setLocale("ja");
        }
        setContentView(R.layout.activity_setting);
        setting_toolbar = findViewById(R.id.setting_toolbar);
        //Customize status bar
        statusBarColor();
        //Customize toolbar
        FILE_PATH=getExternalFilesDir(filepath).getPath();

        setSupportActionBar(setting_toolbar);
        getSupportActionBar().setTitle(null);
        Spinner spinner = (Spinner) findViewById(R.id.spin_language); //Spinner to choose language to change

        //Set resource for spinner
        ArrayAdapter<String> languages = new ArrayAdapter<String>(SettingActivity.this,
                R.layout.languages_spinner_item,getResources().getStringArray(R.array.languages)){

            public View getView(int position, View convertView,ViewGroup parent) {
                View v = super.getView(position, convertView, parent);
                return v;

            }

            public View getDropDownView(int position, View convertView,ViewGroup parent) {
                View v = super.getDropDownView(position, convertView,parent);
                ((TextView) v).setGravity(Gravity.CENTER);
                return v;

            }
        };
        languages.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        spinner.setAdapter(languages);
        Locale locale = getResources().getConfiguration().locale;

        //Set spinner match with current locale
        if(locale.toString().equals("ja")){
            spinner.setSelection(2);
        }else if(locale.toString().equals("vi")){
            spinner.setSelection(0);
        }else{
            spinner.setSelection(1);
        }
        spinner.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            @Override
            public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
                if(spinner.getSelectedItemPosition() == 0){ //Choose language is Vietnamese
                    if(!locale.toString().equals("vi")){
                        setLocale("vi"); //Change current locale
                        saveID(); //Store to file
                        recreate(); //Recreate activity
                    }else{
                        return;
                    }
                }else if(spinner.getSelectedItemPosition() == 1){ //Choose language is English
                    if(!locale.toString().equals("en")){
                        setLocale("en"); //Change current locale
                        saveID(); //Store to file
                        recreate(); //Recreate activity
                    }else{
                        return;
                    }
                }else if(spinner.getSelectedItemPosition() == 2){
                    if(!locale.toString().equals("ja")){ //Choose language is Japanese
                        setLocale("ja"); //Change current locale
                        saveID(); //Store to file
                        recreate(); //Recreate activity
                    }else{
                        return;
                    }
                }
            }

            @Override
            public void onNothingSelected(AdapterView<?> parent) {
                return;
            }
        });

    }


    /*
    Save current locale to file
     */
    public void saveID(){
        String path = FILE_PATH +"/"+ ID_FILE;
        try {
            File file = new File(path);
            if(!file.exists()){
                file.createNewFile();
            }
            FileOutputStream fos = new FileOutputStream(file, false);
            Locale current = getResources().getConfiguration().locale;
            data += current.toString();
            byte buff[] = data.getBytes();
            fos.write(buff,0 ,buff.length);
            fos.close();
        }catch (IOException e) {
            e.printStackTrace();
        }
    }

    @Override
    public void onBackPressed() {
        super.onBackPressed();
        Intent intent = new Intent(this,MainActivity.class);
        startActivity(intent);
        finish();
    }

    /*
    Set locale for application
     */
    private void setLocale(String lang){
        Locale locale = new Locale(lang);
        //save data to shared preference

        //Shared Preference use for set locale on different activities
        SharedPreferences.Editor editor = getSharedPreferences("Setting",MODE_PRIVATE).edit();
        editor.putString("My_Lang",lang);
        editor.apply();
        editor.commit();

        //Config new locale
        Locale.setDefault(locale);
        Configuration config = new Configuration();
        config.setLocale(locale);
        getBaseContext().getResources().updateConfiguration(config,getBaseContext().getResources().getDisplayMetrics());
    }


    private void statusBarColor(){
        if(Build.VERSION.SDK_INT >= Build.VERSION_CODES.M){
            getWindow().setStatusBarColor(getResources().getColor(R.color.main_color,this.getTheme()));
        }else if(Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP){
            getWindow().setStatusBarColor(getResources().getColor(R.color.main_color));
        }
    }

    public void HomeIntent(View view) {
        Intent intent = new Intent(this,MainActivity.class);
        intent.putExtra("value",this.getResources().getConfiguration().locale.toString());
        startActivity(intent);
        finish();
    }


    public void GuidelineIntent(View view){
        Intent intent = new Intent(this,GuilineActivity.class);
        startActivity(intent);
    }
}