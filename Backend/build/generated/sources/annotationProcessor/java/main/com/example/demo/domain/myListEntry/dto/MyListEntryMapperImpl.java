package com.example.demo.domain.myListEntry.dto;

import com.example.demo.domain.myListEntry.MyListEntry;
import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-11-02T15:38:33+0100",
    comments = "version: 1.5.2.Final, compiler: IncrementalProcessingEnvironment from gradle-language-java-7.4.jar, environment: Java 18.0.2 (Amazon.com Inc.)"
)
@Component
public class MyListEntryMapperImpl implements MyListEntryMapper {

    @Override
    public MyListEntry fromDTO(MyListEntryDTO dto) {
        if ( dto == null ) {
            return null;
        }

        MyListEntry myListEntry = new MyListEntry();

        myListEntry.setId( dto.getId() );
        myListEntry.setTitle( dto.getTitle() );
        myListEntry.setText( dto.getText() );
        myListEntry.setPriority( dto.getPriority() );

        return myListEntry;
    }

    @Override
    public List<MyListEntry> fromDTOs(List<MyListEntryDTO> dtos) {
        if ( dtos == null ) {
            return null;
        }

        List<MyListEntry> list = new ArrayList<MyListEntry>( dtos.size() );
        for ( MyListEntryDTO myListEntryDTO : dtos ) {
            list.add( fromDTO( myListEntryDTO ) );
        }

        return list;
    }

    @Override
    public Set<MyListEntry> fromDTOs(Set<MyListEntryDTO> dtos) {
        if ( dtos == null ) {
            return null;
        }

        Set<MyListEntry> set = new LinkedHashSet<MyListEntry>( Math.max( (int) ( dtos.size() / .75f ) + 1, 16 ) );
        for ( MyListEntryDTO myListEntryDTO : dtos ) {
            set.add( fromDTO( myListEntryDTO ) );
        }

        return set;
    }

    @Override
    public MyListEntryDTO toDTO(MyListEntry BO) {
        if ( BO == null ) {
            return null;
        }

        MyListEntryDTO myListEntryDTO = new MyListEntryDTO();

        myListEntryDTO.setId( BO.getId() );
        myListEntryDTO.setTitle( BO.getTitle() );
        myListEntryDTO.setText( BO.getText() );
        myListEntryDTO.setPriority( BO.getPriority() );

        return myListEntryDTO;
    }

    @Override
    public List<MyListEntryDTO> toDTOs(List<MyListEntry> BOs) {
        if ( BOs == null ) {
            return null;
        }

        List<MyListEntryDTO> list = new ArrayList<MyListEntryDTO>( BOs.size() );
        for ( MyListEntry myListEntry : BOs ) {
            list.add( toDTO( myListEntry ) );
        }

        return list;
    }

    @Override
    public Set<MyListEntryDTO> toDTOs(Set<MyListEntry> BOs) {
        if ( BOs == null ) {
            return null;
        }

        Set<MyListEntryDTO> set = new LinkedHashSet<MyListEntryDTO>( Math.max( (int) ( BOs.size() / .75f ) + 1, 16 ) );
        for ( MyListEntry myListEntry : BOs ) {
            set.add( toDTO( myListEntry ) );
        }

        return set;
    }
}
