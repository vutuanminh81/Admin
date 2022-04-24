package com.example.ranwildimal;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.content.SharedPreferences;
import android.content.res.Configuration;
import android.os.Build;
import android.os.Bundle;
import android.text.Editable;
import android.text.TextWatcher;
import android.view.View;
import android.widget.TextView;

import androidx.appcompat.widget.LinearLayoutCompat;
import androidx.appcompat.widget.Toolbar;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.example.ranwildimal.adapter.WordAdapter;
import com.example.ranwildimal.database.DatabaseAccess;
import com.example.ranwildimal.model.Word;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;

import org.jetbrains.annotations.NotNull;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

public class SearchActivity extends AppCompatActivity {

    Toolbar search_toolbar;
    RecyclerView recyclerView;
    WordAdapter wordAdap;
    ArrayList<Word> listWord;
    TextView searchtxt;

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
        setContentView(R.layout.activity_search);
        search_toolbar = findViewById(R.id.search_toolbar);
        recyclerView = findViewById(R.id.search_history_list);
        searchtxt = findViewById(R.id.txt_search_field);
        //Customize status bar
        statusBarColor();
        //Customize toolbar
        setSupportActionBar(search_toolbar);
        getSupportActionBar().setTitle(null);
        listWord = new ArrayList<>();
        wordAdap = new WordAdapter(listWord, SearchActivity.this); //Call WordAdapter to set data set and show data
        LinearLayoutManager manager = new LinearLayoutManager(SearchActivity.this); //Linear Layout Manager use to handling layout for each Lecturer
        recyclerView.setAdapter(wordAdap);
        recyclerView.setLayoutManager(manager);
        searchtxt.addTextChangedListener(new TextWatcher() { //Set filter list to adapter match with text input
            @Override
            public void beforeTextChanged(CharSequence s, int start, int count, int after) {

            }

            @Override
            public void onTextChanged(CharSequence s, int start, int before, int count) {
                filter(s.toString());
            }

            @Override
            public void afterTextChanged(Editable s) {

            }
        });

    }


    /*
    Filter list with text input
     */
    private void filter(String s) {
        ArrayList<Word> newlist = new ArrayList<>();
        if (s.isEmpty()) {
            recyclerView.setVisibility(View.INVISIBLE);
        } else {
            Locale current = getResources().getConfiguration().locale;
            DatabaseAccess dbAccess = DatabaseAccess.getInstance(getApplicationContext());
            dbAccess.openConn();
            newlist = dbAccess.searchWord(s, current.toString());
            if (!newlist.isEmpty()) {
                recyclerView.setVisibility(View.VISIBLE);
            } else {
                recyclerView.setVisibility(View.INVISIBLE);
            }
            wordAdap.ArrayFilter(newlist);
        }


    }

    private void statusBarColor() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            getWindow().setStatusBarColor(getResources().getColor(R.color.main_color, this.getTheme()));
        } else if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            getWindow().setStatusBarColor(getResources().getColor(R.color.main_color));
        }
    }

    public void HomeIntent(View view) {
        Intent intent = new Intent(this, MainActivity.class);
        this.startActivity(intent);
        finish();
    }

    @Override
    public void onBackPressed() {
        super.onBackPressed();
        Intent intent = new Intent(this, MainActivity.class);
        this.startActivity(intent);
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
}